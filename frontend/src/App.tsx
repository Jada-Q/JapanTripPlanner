import { useState } from 'react';
import { isAxiosError } from 'axios';
import { Header } from './components/layout/Header';
import { LandingPage } from './pages/LandingPage';
import { ItineraryPage } from './pages/ItineraryPage';
import { useGenerateItinerary } from './hooks/useGenerateItinerary';
import type { TripRequest } from './types/request';
import type { Itinerary } from './types/itinerary';

function getErrorMessage(error: Error): string {
  if (isAxiosError(error)) {
    const detail = error.response?.data?.detail;
    if (typeof detail === 'string') {
      // Show only the friendly part, strip raw API errors
      if (detail.includes('rate limit') || detail.includes('频率超限')) {
        return detail;
      }
      if (detail.includes('429') || detail.includes('Quota exceeded')) {
        return 'API 请求频率超限，请等待1-2分钟后重试。';
      }
      // Truncate overly long error messages
      return detail.length > 200 ? detail.slice(0, 200) + '...' : detail;
    }
    return error.message;
  }
  return error.message;
}

function App() {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const mutation = useGenerateItinerary();

  const handleSubmit = (request: TripRequest) => {
    mutation.mutate(request, {
      onSuccess: (data) => setItinerary(data),
    });
  };

  const handleNewTrip = () => {
    setItinerary(null);
    mutation.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {mutation.error && (
        <div className="max-w-xl mx-auto px-4 mt-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {getErrorMessage(mutation.error)}
          </div>
        </div>
      )}
      {itinerary ? (
        <ItineraryPage itinerary={itinerary} onNewTrip={handleNewTrip} />
      ) : (
        <LandingPage onSubmit={handleSubmit} isLoading={mutation.isPending} />
      )}
    </div>
  );
}

export default App;
