import { useMutation } from '@tanstack/react-query';
import { generateItinerary } from '../api/itinerary';
import type { TripRequest } from '../types/request';
import type { Itinerary } from '../types/itinerary';

export function useGenerateItinerary() {
  return useMutation<Itinerary, Error, TripRequest>({
    mutationFn: generateItinerary,
  });
}
