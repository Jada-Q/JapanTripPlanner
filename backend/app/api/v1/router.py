from fastapi import APIRouter

from app.api.v1.itinerary import router as itinerary_router
from app.api.v1.reference import router as reference_router

api_v1_router = APIRouter()
api_v1_router.include_router(itinerary_router)
api_v1_router.include_router(reference_router)
