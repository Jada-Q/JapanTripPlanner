import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Activity } from '../../types/itinerary';

const CATEGORY_ICONS: Record<string, string> = {
  sightseeing: '🏛',
  temple: '⛩',
  food: '🍜',
  shopping: '🛍',
  experience: '🎌',
  nature: '🌿',
  museum: '🏛',
  landmark: '🗼',
};

const TRANSPORT_MODE_ICONS: Record<string, string> = {
  walk: '🚶',
  metro: '🚇',
  bus: '🚌',
  train: '🚃',
  taxi: '🚕',
};

interface Props {
  activity: Activity;
  isLast?: boolean;
}

export function ActivityItem({ activity, isLast }: Props) {
  const { t } = useTranslation();
  const [showAddress, setShowAddress] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);
  const icon = CATEGORY_ICONS[activity.category] || '📍';

  const copyAddress = async () => {
    await navigator.clipboard.writeText(activity.address_ja);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const transport = activity.transport_to_next;

  return (
    <div>
      {/* Activity card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {/* Photo banner */}
        {activity.photo_url && !imgError && (
          <div className="h-36 w-full overflow-hidden bg-gray-100">
            <img
              src={activity.photo_url}
              alt={activity.name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          </div>
        )}

        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span>{icon}</span>
                <h4 className="font-medium text-gray-900">{activity.name}</h4>
                <span className="text-sm text-gray-400">{activity.name_ja}</span>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">
                {activity.start_time} - {activity.end_time}
                <span className="text-gray-400 ml-1">({activity.duration_minutes}min)</span>
              </p>
            </div>
            {activity.estimated_cost_yen != null && (
              <span className="text-sm font-medium text-gray-700">
                ¥{activity.estimated_cost_yen.toLocaleString()}
              </span>
            )}
          </div>

          {/* Highlight — unique selling point */}
          {activity.highlight && (
            <p className="mt-2 text-sm text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-md font-medium">
              ✨ {activity.highlight}
            </p>
          )}

          <p className="text-sm text-gray-600 mt-2">{activity.description}</p>

          {/* Info row: station, hours, phone */}
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>📍</span>
              <span>{activity.nearest_station} ({activity.nearest_station_ja})</span>
              <span>· {activity.walking_minutes_from_station}min walk</span>
            </div>

            {activity.business_hours && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span>🕐</span>
                <span>{t('itinerary.hours')}: {activity.business_hours}</span>
              </div>
            )}

            {activity.phone && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span>📞</span>
                <a href={`tel:${activity.phone}`} className="text-blue-600 hover:underline">
                  {activity.phone}
                </a>
              </div>
            )}
          </div>

          {/* Google Maps link */}
          {activity.google_maps_url && (
            <div className="mt-2">
              <a
                href={activity.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-2.5 py-1 rounded-full transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {t('itinerary.openMaps')}
              </a>
            </div>
          )}

          {activity.seasonal_note && (
            <p className="mt-2 text-xs text-pink-600 bg-pink-50 px-2 py-1 rounded">
              🌸 {activity.seasonal_note}
            </p>
          )}

          {activity.tips && (
            <p className="mt-1 text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded">
              💡 {activity.tips}
            </p>
          )}

          {/* Japanese address toggle */}
          <div className="mt-2">
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              {showAddress ? '▲' : '▼'} {t('itinerary.showAddress')}
            </button>
            {showAddress && (
              <div className="mt-1 bg-gray-50 border border-gray-200 rounded p-2 flex items-center justify-between">
                <span className="text-sm font-mono text-gray-800">{activity.address_ja}</span>
                <button
                  onClick={copyAddress}
                  className="text-xs text-blue-600 hover:text-blue-800 ml-2 whitespace-nowrap"
                >
                  {copied ? t('itinerary.copied') : t('itinerary.copyAddress')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Transport to next activity */}
      {!isLast && transport && (
        <div className="flex items-center gap-2 my-2 ml-6 py-1.5 px-3 text-xs text-gray-500">
          <span className="text-base">{TRANSPORT_MODE_ICONS[transport.mode] || '🚶'}</span>
          <div className="flex-1 border-t border-dashed border-gray-300" />
          <span className="font-medium text-gray-600">{transport.duration_minutes} min</span>
          <div className="flex-1 border-t border-dashed border-gray-300" />
          <span className="text-gray-500 max-w-[200px] truncate" title={transport.description}>
            {transport.description}
          </span>
          {transport.cost_yen != null && transport.cost_yen > 0 && (
            <span className="text-gray-400">¥{transport.cost_yen}</span>
          )}
        </div>
      )}
    </div>
  );
}
