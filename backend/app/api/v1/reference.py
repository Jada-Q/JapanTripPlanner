from fastapi import APIRouter

from app.data.cities import CITIES
from app.data.jr_passes import JR_PASSES
from app.data.seasonal_events import get_seasonal_events

router = APIRouter(prefix="/reference", tags=["reference"])


@router.get("/cities")
async def list_cities():
    return CITIES


@router.get("/jr-passes")
async def list_jr_passes():
    return JR_PASSES


@router.get("/seasonal-events")
async def list_seasonal_events(month: int | None = None):
    return get_seasonal_events(month)
