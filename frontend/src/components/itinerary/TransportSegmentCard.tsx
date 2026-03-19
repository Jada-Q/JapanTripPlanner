import { useTranslation } from 'react-i18next';
import type { TransportSegment } from '../../types/itinerary';

const TRAIN_ICONS: Record<string, string> = {
  shinkansen: '🚅',
  limited_express: '🚄',
  local: '🚃',
  subway: '🚇',
  bus: '🚌',
};

interface Props {
  segment: TransportSegment;
}

export function TransportSegmentCard({ segment }: Props) {
  const { t } = useTranslation();
  const icon = TRAIN_ICONS[segment.train_type] || '🚃';

  return (
    <div className="ml-4 my-2 border-l-2 border-blue-300 pl-4 py-2">
      <div className="flex items-center gap-2 text-sm font-medium text-blue-700">
        <span>{icon}</span>
        <span>{segment.train_name}</span>
        {segment.covered_by_jr_pass && (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            JR Pass ✓
          </span>
        )}
      </div>

      <div className="mt-1 flex items-start gap-4 text-sm text-gray-600">
        <div className="flex flex-col items-center">
          <span className="font-mono font-medium">{segment.departure_time}</span>
          <div className="w-px h-6 bg-gray-300 my-1" />
          <span className="font-mono font-medium">{segment.arrival_time}</span>
        </div>
        <div className="flex flex-col">
          <span>
            {segment.from_station}
            <span className="text-gray-400 ml-1">{segment.from_station_ja}</span>
          </span>
          <span className="text-xs text-gray-400 my-1">
            {t('itinerary.duration', { minutes: segment.duration_minutes })}
          </span>
          <span>
            {segment.to_station}
            <span className="text-gray-400 ml-1">{segment.to_station_ja}</span>
          </span>
        </div>
      </div>

      <div className="mt-1 text-sm text-gray-500">
        ¥{segment.fare_yen.toLocaleString()}
        {segment.platform_note && (
          <span className="ml-2 text-xs text-gray-400">{segment.platform_note}</span>
        )}
      </div>

      {segment.notes && (
        <p className="mt-1 text-xs text-amber-600">{segment.notes}</p>
      )}
    </div>
  );
}
