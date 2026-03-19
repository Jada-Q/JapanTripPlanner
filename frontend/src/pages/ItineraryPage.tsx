import type { Itinerary } from '../types/itinerary';
import { ItineraryView } from '../components/itinerary/ItineraryView';

interface Props {
  itinerary: Itinerary;
  onNewTrip: () => void;
}

export function ItineraryPage({ itinerary, onNewTrip }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <ItineraryView itinerary={itinerary} onNewTrip={onNewTrip} />
    </div>
  );
}
