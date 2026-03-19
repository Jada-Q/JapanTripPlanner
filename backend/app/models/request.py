from datetime import date
from enum import Enum

from pydantic import BaseModel, Field


class BudgetLevel(str, Enum):
    BUDGET = "budget"
    MODERATE = "moderate"
    LUXURY = "luxury"


class TravelPace(str, Enum):
    RELAXED = "relaxed"
    MODERATE = "moderate"
    INTENSIVE = "intensive"


class InterestTag(str, Enum):
    TEMPLES = "temples"
    FOOD = "food"
    SHOPPING = "shopping"
    NATURE = "nature"
    ANIME = "anime"
    HISTORY = "history"
    ONSEN = "onsen"
    NIGHTLIFE = "nightlife"
    PHOTOGRAPHY = "photography"
    FAMILY = "family"


class TripRequest(BaseModel):
    start_date: date
    end_date: date
    cities: list[str] = Field(..., min_length=1, max_length=8)
    budget_level: BudgetLevel = BudgetLevel.MODERATE
    pace: TravelPace = TravelPace.MODERATE
    interests: list[InterestTag] = []
    include_jr_pass_calc: bool = True
    language: str = Field(default="zh", pattern="^(zh|en)$")

    @property
    def num_days(self) -> int:
        return (self.end_date - self.start_date).days + 1
