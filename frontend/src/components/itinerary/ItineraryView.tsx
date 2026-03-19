import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Itinerary } from '../../types/itinerary';
import { DayCard } from './DayCard';
import { JRPassSummary } from './JRPassSummary';

interface Props {
  itinerary: Itinerary;
  onNewTrip: () => void;
}

export function ItineraryView({ itinerary, onNewTrip }: Props) {
  const { t } = useTranslation();
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">{itinerary.title}</h2>
        {itinerary.title_ja && (
          <p className="text-gray-500">{itinerary.title_ja}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          {itinerary.start_date} ~ {itinerary.end_date} · {itinerary.num_days} days
        </p>
      </div>

      {/* JR Pass Recommendation */}
      <JRPassSummary recommendation={itinerary.jr_pass_recommendation} />

      {/* Day navigation tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {itinerary.days.map((day, i) => (
          <button
            key={i}
            onClick={() => setActiveDay(i)}
            className={`flex-shrink-0 px-4 py-2 text-sm rounded-lg border transition-colors ${
              activeDay === i
                ? 'bg-blue-600 text-white border-blue-600'
                : 'border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {t('itinerary.day', { number: day.day_number })}
            <span className="ml-1 text-xs opacity-75">{day.city}</span>
          </button>
        ))}
      </div>

      {/* Active day card */}
      <DayCard day={itinerary.days[activeDay]} />

      {/* Seasonal highlights */}
      {itinerary.seasonal_highlights.length > 0 && (
        <div className="bg-pink-50 border border-pink-200 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-2">🌸 Seasonal Highlights</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            {itinerary.seasonal_highlights.map((h, i) => (
              <li key={i}>• {h}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Total cost */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
        <p className="text-sm text-gray-500">{t('itinerary.totalCost')}</p>
        <p className="text-3xl font-bold text-gray-900">
          ¥{itinerary.total_estimated_cost_yen.toLocaleString()}
        </p>
      </div>

      {/* Tips */}
      {itinerary.general_tips.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-gray-900 mb-2">💡 Tips</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            {itinerary.general_tips.map((tip, i) => (
              <li key={i}>• {tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* New trip button */}
      <button
        onClick={onNewTrip}
        className="w-full py-3 px-4 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
      >
        {t('itinerary.newTrip')}
      </button>
    </div>
  );
}
