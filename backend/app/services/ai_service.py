"""
Unified AI service supporting multiple providers (Kimi / Gemini).
"""

import asyncio
import json
import logging

from openai import AsyncOpenAI, RateLimitError

from app.config import settings
from app.models.request import TripRequest
from app.prompts.system_prompt import build_system_prompt
from app.prompts.templates import build_user_prompt

logger = logging.getLogger(__name__)

MAX_RETRIES = 3

# JSON schema description embedded in the prompt so Kimi returns structured data.
JSON_SCHEMA_INSTRUCTION = """
You MUST return ONLY a valid JSON object (no markdown fences, no explanation).
The JSON must follow this exact structure:

{
  "title": "string — trip title",
  "title_ja": "string — trip title in Japanese (optional)",
  "days": [
    {
      "day_number": 1,
      "city": "string — city name in user language",
      "city_ja": "string — city name in Japanese",
      "theme": "string — day theme description",
      "activities": [
        {
          "name": "string",
          "name_ja": "string — Japanese name",
          "address": "string — address in user language",
          "address_ja": "string — full Japanese address",
          "category": "string — e.g. temple, food, shopping, nature, museum",
          "start_time": "string — e.g. 09:00",
          "end_time": "string — e.g. 10:30",
          "duration_minutes": 90,
          "estimated_cost_yen": 500,
          "description": "string",
          "tips": "string or null",
          "seasonal_note": "string or null",
          "nearest_station": "string",
          "nearest_station_ja": "string — Japanese station name",
          "walking_minutes_from_station": 5,
          "google_maps_url": "string — Google Maps search URL, format: https://www.google.com/maps/search/?api=1&query=PLACE+NAME+CITY+JAPAN e.g. https://www.google.com/maps/search/?api=1&query=Senso-ji+Temple+Asakusa+Tokyo",
          "business_hours": "string or null — e.g. 09:00-17:00, or 24 hours, or Varies by shop",
          "phone": "string or null — phone number with country code, e.g. +81-3-3842-0181",
          "wikipedia_slug": "string — the English Wikipedia article title for this place, e.g. 'Sensō-ji', 'Shibuya Crossing', 'Fushimi Inari-taisha', 'Shinjuku Gyoen'. Must be the exact Wikipedia article title.",
          "highlight": "string — 1-2 sentence unique selling point, e.g. 'Tokyo's oldest temple with the iconic red Kaminarimon gate and 250m-long Nakamise shopping street' or 'World-famous scramble crossing where up to 3000 people cross at once'",
          "transport_to_next": {
            "mode": "string — walk/metro/bus/train/taxi",
            "duration_minutes": 15,
            "description": "string — e.g. Walk 5 min to station, take Metro Ginza Line 3 stops to Ueno",
            "cost_yen": 170
          }
        }
      ],
      "transport_segments": [
        {
          "from_station": "string",
          "from_station_ja": "string",
          "to_station": "string",
          "to_station_ja": "string",
          "train_name": "string — e.g. Hikari 501",
          "train_type": "string — e.g. shinkansen, express, local, metro",
          "departure_time": "string — e.g. 08:30",
          "arrival_time": "string — e.g. 10:45",
          "duration_minutes": 135,
          "fare_yen": 13870,
          "covered_by_jr_pass": true,
          "seat_type": "string — reserved/non-reserved/green",
          "platform_note": "string or null",
          "notes": "string or null"
        }
      ],
      "daily_transport_cost_yen": 1500,
      "daily_estimated_total_yen": 8000,
      "weather_note": "string or null",
      "morning_tip": "string or null"
    }
  ],
  "seasonal_highlights": ["string"],
  "packing_tips": ["string"],
  "general_tips": ["string"]
}

IMPORTANT for activities:
- "google_maps_url": Always provide a Google Maps search URL for every location
- "business_hours": Provide opening hours when known (restaurants, shops, temples, museums)
- "phone": Provide reservation/contact phone when available (especially for restaurants)
- "photo_url": Provide a reference photo URL — prefer Wikipedia Commons URLs for famous landmarks
- "highlight": MUST provide a vivid 1-2 sentence highlight describing what makes this place special and worth visiting
- "transport_to_next": For every activity EXCEPT the last one of the day, describe how to get to the next activity (walking, metro, bus, etc). Set to null for the last activity of each day.
- NEVER recommend permanently closed, demolished, or relocated venues
- All activities in a day MUST be in the same area/neighborhood — minimize cross-city travel
"""


class AIService:
    """OpenAI-compatible AI service (works with Kimi / Moonshot API)."""

    def __init__(self):
        self.client = AsyncOpenAI(
            api_key=settings.kimi_api_key,
            base_url=settings.kimi_base_url,
        )
        self.model = settings.kimi_model

    async def generate_itinerary_json(self, request: TripRequest) -> dict:
        system_prompt = build_system_prompt(request.language) + "\n" + JSON_SCHEMA_INSTRUCTION
        user_prompt = build_user_prompt(request)

        for attempt in range(MAX_RETRIES):
            try:
                response = await asyncio.to_thread(
                    self._call_api_sync, system_prompt, user_prompt
                )
                return response

            except RateLimitError:
                wait = 30 * (attempt + 1)
                logger.warning(
                    f"Rate limited, retrying in {wait}s (attempt {attempt + 1}/{MAX_RETRIES})"
                )
                if attempt < MAX_RETRIES - 1:
                    await asyncio.sleep(wait)
                else:
                    raise RuntimeError(
                        "API rate limit exceeded. Please wait 1-2 minutes and try again."
                        if request.language == "en"
                        else "API 请求频率超限，请等待1-2分钟后重试。"
                    )
            except json.JSONDecodeError as e:
                logger.error(f"Failed to parse AI response as JSON: {e}")
                if attempt < MAX_RETRIES - 1:
                    logger.info(f"Retrying ({attempt + 2}/{MAX_RETRIES})...")
                    continue
                raise RuntimeError(
                    "AI returned invalid format. Please try again."
                    if request.language == "en"
                    else "AI 返回格式异常，请重试。"
                )

    def _call_api_sync(self, system_prompt: str, user_prompt: str) -> dict:
        """Synchronous API call — run via asyncio.to_thread."""
        from openai import OpenAI

        client = OpenAI(
            api_key=settings.kimi_api_key,
            base_url=settings.kimi_base_url,
        )
        response = client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.7,
            max_tokens=16000,
        )

        content = response.choices[0].message.content.strip()

        # Strip markdown code fences if present
        if content.startswith("```"):
            content = content.split("\n", 1)[1] if "\n" in content else content[3:]
            if content.endswith("```"):
                content = content[:-3].strip()

        logger.info(f"AI response length: {len(content)}, finish_reason: {response.choices[0].finish_reason}")
        return json.loads(content)


# Keep backward-compatible alias
GeminiService = AIService
