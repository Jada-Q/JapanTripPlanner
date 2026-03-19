import { apiClient } from "./client"
import type { TripRequest } from "@/types/request"
import type { Itinerary } from "@/types/itinerary"
import type { CityOption } from "@/types/request"

export async function generateItinerary(
  request: TripRequest
): Promise<Itinerary> {
  const { data } = await apiClient.post<Itinerary>(
    "/api/v1/itinerary/generate",
    request
  )
  return data
}

export async function fetchCities(): Promise<CityOption[]> {
  const { data } = await apiClient.get<CityOption[]>(
    "/api/v1/reference/cities"
  )
  return data
}
