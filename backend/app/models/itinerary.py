from datetime import date

from pydantic import BaseModel


class TransportSegment(BaseModel):
    from_station: str
    from_station_ja: str
    to_station: str
    to_station_ja: str
    train_name: str
    train_type: str  # shinkansen | limited_express | local | subway | bus
    departure_time: str
    arrival_time: str
    duration_minutes: int
    fare_yen: int
    covered_by_jr_pass: bool
    seat_type: str = "non-reserved"
    platform_note: str | None = None
    notes: str | None = None


class TransportToNext(BaseModel):
    mode: str  # walk | metro | bus | train | taxi
    duration_minutes: int
    description: str
    cost_yen: int | None = None


class Activity(BaseModel):
    name: str
    name_ja: str
    address: str
    address_ja: str
    category: str  # sightseeing | food | shopping | experience
    start_time: str
    end_time: str
    duration_minutes: int
    estimated_cost_yen: int | None = None
    description: str
    tips: str | None = None
    seasonal_note: str | None = None
    nearest_station: str
    nearest_station_ja: str
    walking_minutes_from_station: int
    google_maps_url: str | None = None
    business_hours: str | None = None
    phone: str | None = None
    photo_url: str | None = None
    highlight: str | None = None
    transport_to_next: TransportToNext | None = None


class DayPlan(BaseModel):
    day_number: int
    date: date
    city: str
    city_ja: str
    theme: str
    activities: list[Activity]
    transport_segments: list[TransportSegment]
    daily_transport_cost_yen: int
    daily_estimated_total_yen: int
    weather_note: str | None = None
    morning_tip: str | None = None


class JRPassRecommendation(BaseModel):
    recommended: bool
    pass_type: str
    pass_cost_yen: int
    individual_tickets_cost_yen: int
    savings_yen: int
    covered_segments: list[str]
    not_covered_segments: list[str]
    recommendation_note: str
    alternative_passes: list[dict] | None = None


class Itinerary(BaseModel):
    trip_id: str
    title: str
    title_ja: str | None = None
    start_date: date
    end_date: date
    num_days: int
    cities: list[str]
    days: list[DayPlan]
    jr_pass_recommendation: JRPassRecommendation
    total_estimated_cost_yen: int
    seasonal_highlights: list[str]
    packing_tips: list[str]
    general_tips: list[str]
