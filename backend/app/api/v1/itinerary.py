from fastapi import APIRouter, HTTPException

from app.models.request import TripRequest
from app.models.itinerary import Itinerary
from app.services.itinerary_service import ItineraryService

router = APIRouter(prefix="/itinerary", tags=["itinerary"])


@router.post("/generate", response_model=Itinerary)
async def generate_itinerary(request: TripRequest):
    if request.num_days > 21:
        raise HTTPException(status_code=400, detail="Trip cannot exceed 21 days")
    if request.num_days < 1:
        raise HTTPException(status_code=400, detail="End date must be after start date")

    service = ItineraryService()
    try:
        itinerary = await service.generate(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate itinerary: {str(e)}")
    return itinerary
