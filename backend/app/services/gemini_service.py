import asyncio
import json
import logging

import google.generativeai as genai
from google.api_core.exceptions import ResourceExhausted

from app.config import settings
from app.models.request import TripRequest
from app.prompts.system_prompt import build_system_prompt
from app.prompts.templates import build_user_prompt

logger = logging.getLogger(__name__)

MAX_RETRIES = 3


class GeminiService:
    def __init__(self):
        genai.configure(api_key=settings.google_api_key)

    async def generate_itinerary_json(self, request: TripRequest) -> dict:
        system_prompt = build_system_prompt(request.language)
        user_prompt = build_user_prompt(request)

        model = genai.GenerativeModel(
            model_name=settings.gemini_model,
            system_instruction=system_prompt,
            generation_config=genai.GenerationConfig(
                response_mime_type="application/json",
                response_schema=self._get_response_schema(),
                temperature=0.7,
            ),
        )

        for attempt in range(MAX_RETRIES):
            try:
                response = await model.generate_content_async(user_prompt)
                return json.loads(response.text)
            except ResourceExhausted:
                wait = 30 * (attempt + 1)
                logger.warning(f"Rate limited, retrying in {wait}s (attempt {attempt + 1}/{MAX_RETRIES})")
                if attempt < MAX_RETRIES - 1:
                    await asyncio.sleep(wait)
                else:
                    raise RuntimeError(
                        "API rate limit exceeded. Please wait 1-2 minutes and try again."
                        if request.language == "en"
                        else "API 请求频率超限，请等待1-2分钟后重试。"
                    )

    def _get_response_schema(self) -> dict:
        """JSON schema for Gemini structured output."""
        transport_segment = {
            "type": "OBJECT",
            "properties": {
                "from_station": {"type": "STRING"},
                "from_station_ja": {"type": "STRING"},
                "to_station": {"type": "STRING"},
                "to_station_ja": {"type": "STRING"},
                "train_name": {"type": "STRING"},
                "train_type": {"type": "STRING"},
                "departure_time": {"type": "STRING"},
                "arrival_time": {"type": "STRING"},
                "duration_minutes": {"type": "INTEGER"},
                "fare_yen": {"type": "INTEGER"},
                "covered_by_jr_pass": {"type": "BOOLEAN"},
                "seat_type": {"type": "STRING"},
                "platform_note": {"type": "STRING"},
                "notes": {"type": "STRING"},
            },
            "required": [
                "from_station", "from_station_ja", "to_station", "to_station_ja",
                "train_name", "train_type", "departure_time", "arrival_time",
                "duration_minutes", "fare_yen", "covered_by_jr_pass",
            ],
        }

        activity = {
            "type": "OBJECT",
            "properties": {
                "name": {"type": "STRING"},
                "name_ja": {"type": "STRING"},
                "address": {"type": "STRING"},
                "address_ja": {"type": "STRING"},
                "category": {"type": "STRING"},
                "start_time": {"type": "STRING"},
                "end_time": {"type": "STRING"},
                "duration_minutes": {"type": "INTEGER"},
                "estimated_cost_yen": {"type": "INTEGER"},
                "description": {"type": "STRING"},
                "tips": {"type": "STRING"},
                "seasonal_note": {"type": "STRING"},
                "nearest_station": {"type": "STRING"},
                "nearest_station_ja": {"type": "STRING"},
                "walking_minutes_from_station": {"type": "INTEGER"},
            },
            "required": [
                "name", "name_ja", "address", "address_ja", "category",
                "start_time", "end_time", "duration_minutes", "description",
                "nearest_station", "nearest_station_ja", "walking_minutes_from_station",
            ],
        }

        day_plan = {
            "type": "OBJECT",
            "properties": {
                "day_number": {"type": "INTEGER"},
                "city": {"type": "STRING"},
                "city_ja": {"type": "STRING"},
                "theme": {"type": "STRING"},
                "activities": {"type": "ARRAY", "items": activity},
                "transport_segments": {"type": "ARRAY", "items": transport_segment},
                "daily_transport_cost_yen": {"type": "INTEGER"},
                "daily_estimated_total_yen": {"type": "INTEGER"},
                "weather_note": {"type": "STRING"},
                "morning_tip": {"type": "STRING"},
            },
            "required": [
                "day_number", "city", "city_ja", "theme",
                "activities", "transport_segments",
                "daily_transport_cost_yen", "daily_estimated_total_yen",
            ],
        }

        return {
            "type": "OBJECT",
            "properties": {
                "title": {"type": "STRING"},
                "title_ja": {"type": "STRING"},
                "days": {"type": "ARRAY", "items": day_plan},
                "seasonal_highlights": {"type": "ARRAY", "items": {"type": "STRING"}},
                "packing_tips": {"type": "ARRAY", "items": {"type": "STRING"}},
                "general_tips": {"type": "ARRAY", "items": {"type": "STRING"}},
            },
            "required": ["title", "days", "seasonal_highlights", "packing_tips", "general_tips"],
        }
