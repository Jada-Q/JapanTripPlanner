import { useTranslation } from 'react-i18next';
import type { DayPlan } from '../../types/itinerary';
import { ActivityItem } from './ActivityItem';
import { TransportSegmentCard } from './TransportSegmentCard';

interface Props {
  day: DayPlan;
}

export function DayCard({ day }: Props) {
  const { t } = useTranslation();

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* Day header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">
              {t('itinerary.day', { number: day.day_number })} · {day.city}
              <span className="text-gray-400 ml-1 text-sm">{day.city_ja}</span>
            </h3>
            <p className="text-sm text-gray-600">{day.theme}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">{day.date}</p>
            <p className="text-sm font-medium text-gray-700">
              ¥{day.daily_estimated_total_yen.toLocaleString()}
            </p>
          </div>
        </div>
        {day.morning_tip && (
          <p className="mt-1 text-xs text-blue-600">💡 {day.morning_tip}</p>
        )}
        {day.weather_note && (
          <p className="mt-1 text-xs text-gray-500">🌤 {day.weather_note}</p>
        )}
      </div>

      {/* Timeline: activities with inter-activity transport built-in */}
      <div className="p-4 space-y-1">
        {day.activities.map((activity, i) => (
          <ActivityItem
            key={i}
            activity={activity}
            isLast={i === day.activities.length - 1}
          />
        ))}

        {/* Intercity / long-distance transport segments (shinkansen, etc.) */}
        {day.transport_segments.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-2">
              🚄 {t('itinerary.transport')}
            </p>
            {day.transport_segments.map((seg, i) => (
              <TransportSegmentCard key={i} segment={seg} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
