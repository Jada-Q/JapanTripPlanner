import uuid
from datetime import timedelta

from app.models.request import TripRequest
from app.models.itinerary import Itinerary, TransportSegment
from app.services.ai_service import AIService
from app.services.jr_pass_calculator import JRPassCalculator
from app.services.wikipedia_service import resolve_photo_urls


class ItineraryService:
    def __init__(self):
        self.ai = AIService()
        self.jr_calculator = JRPassCalculator()

    async def generate(self, request: TripRequest) -> Itinerary:
        # 1. Call AI service to generate the raw itinerary
        raw = await self.ai.generate_itinerary_json(request)

        # 2. Inject computed fields
        raw["trip_id"] = str(uuid.uuid4())
        raw["start_date"] = request.start_date.isoformat()
        raw["end_date"] = request.end_date.isoformat()
        raw["num_days"] = request.num_days
        raw["cities"] = request.cities

        # Assign actual dates to each day
        for i, day in enumerate(raw.get("days", [])):
            day["date"] = (request.start_date + timedelta(days=i)).isoformat()

        # 3. Extract all transport segments for JR Pass calculation
        all_segments = []
        for day in raw.get("days", []):
            for s in day.get("transport_segments", []):
                # Fill defaults for optional fields
                s.setdefault("seat_type", "non-reserved")
                s.setdefault("platform_note", None)
                s.setdefault("notes", None)
                all_segments.append(TransportSegment(**s))

        # 4. Run deterministic JR Pass calculation
        if request.include_jr_pass_calc:
            jr_recommendation = self.jr_calculator.calculate(
                all_segments, request.num_days, request.language
            )
        else:
            jr_recommendation = self.jr_calculator.calculate([], 0, request.language)

        raw["jr_pass_recommendation"] = jr_recommendation.model_dump()

        # 5. Resolve wikipedia_slug → photo_url via Wikipedia REST API
        activities_by_day = [
            day.get("activities", []) for day in raw.get("days", [])
        ]
        await resolve_photo_urls(activities_by_day)

        # 6. Calculate totals
        raw["total_estimated_cost_yen"] = sum(
            day.get("daily_estimated_total_yen", 0) for day in raw.get("days", [])
        )

        # 7. Fill defaults for ALL fields AI might omit
        for day in raw.get("days", []):
            # Day-level required fields (AI sometimes omits these)
            day.setdefault("city_ja", day.get("city", ""))
            day.setdefault("theme", "")
            day.setdefault("activities", [])
            day.setdefault("transport_segments", [])
            day.setdefault("daily_transport_cost_yen", 0)
            day.setdefault("daily_estimated_total_yen", 0)
            day.setdefault("weather_note", None)
            day.setdefault("morning_tip", None)

            for act in day.get("activities", []):
                # Required string fields — fallback to name or empty string
                act.setdefault("name_ja", act.get("name", ""))
                act.setdefault("address", "")
                act.setdefault("address_ja", act.get("address", ""))
                act.setdefault("category", "sightseeing")
                act.setdefault("start_time", "09:00")
                act.setdefault("end_time", "10:00")
                act.setdefault("duration_minutes", 60)
                act.setdefault("description", "")
                act.setdefault("nearest_station", "")
                act.setdefault("nearest_station_ja", act.get("nearest_station", ""))
                act.setdefault("walking_minutes_from_station", 5)

                # Optional fields
                act.setdefault("estimated_cost_yen", None)
                act.setdefault("tips", None)
                act.setdefault("seasonal_note", None)
                act.setdefault("google_maps_url", None)
                act.setdefault("business_hours", None)
                act.setdefault("phone", None)
                act.setdefault("photo_url", None)
                act.setdefault("highlight", None)

                # Clean up invalid transport_to_next (AI sometimes returns it with null fields)
                ttn = act.get("transport_to_next")
                if ttn is not None:
                    if not ttn.get("mode") or ttn.get("duration_minutes") is None:
                        act["transport_to_next"] = None
                else:
                    act["transport_to_next"] = None

        # 8. Fill defaults for top-level optional fields
        raw.setdefault("title_ja", None)
        raw.setdefault("seasonal_highlights", [])
        raw.setdefault("packing_tips", [])
        raw.setdefault("general_tips", [])

        # 9. Validate against Pydantic model
        itinerary = Itinerary(**raw)
        return itinerary
