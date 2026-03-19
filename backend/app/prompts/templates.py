from app.models.request import TripRequest
from app.data.seasonal_events import get_events_for_date_range
from app.data.cities import get_city_details


def build_user_prompt(request: TripRequest) -> str:
    city_details = [get_city_details(c) for c in request.cities]
    city_info = "\n".join([
        f"- {c['name_en']} ({c['name_ja']}): key stations: "
        f"{', '.join(s['name_en'] for s in c['stations'])}"
        for c in city_details if c
    ])

    seasonal = get_events_for_date_range(request.start_date, request.end_date)
    seasonal_info = "\n".join([f"- {e}" for e in seasonal]) if seasonal else "No major seasonal events."

    interests_str = (
        ", ".join([i.value for i in request.interests])
        if request.interests
        else "general sightseeing"
    )

    return f"""Plan a {request.num_days}-day Japan trip:

## Trip Details
- Dates: {request.start_date.isoformat()} to {request.end_date.isoformat()}
- Cities to visit (in rough order): {', '.join(request.cities)}
- Budget level: {request.budget_level.value}
- Travel pace: {request.pace.value}
- Interests: {interests_str}

## City Reference
{city_info}

## Seasonal Context
{seasonal_info}

## Requirements
1. Create a day-by-day plan covering all {request.num_days} days
2. For EVERY transport segment between locations, provide:
   - Exact station names (English + Japanese)
   - Train name/type and line
   - Approximate departure/arrival times
   - Fare in yen
   - Whether this segment is covered by a nationwide JR Pass
3. For EVERY activity, provide:
   - Name in English and Japanese
   - Full address in Japanese (for showing taxi drivers)
   - Nearest station + walking time
   - Estimated cost
4. Allocate appropriate days per city based on city size:
   - Tokyo: 3-4 days, Kyoto: 2-3 days, Osaka: 1-2 days
   - Smaller cities (Kanazawa, Nara, Kamakura): 1 day or half-day
5. Place intercity travel strategically
6. Include 2-3 meal recommendations per day with price range

Return the structured itinerary as JSON.
"""
