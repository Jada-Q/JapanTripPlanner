import { useTranslation } from 'react-i18next';
import type { JRPassRecommendation } from '../../types/itinerary';

interface Props {
  recommendation: JRPassRecommendation;
}

export function JRPassSummary({ recommendation }: Props) {
  const { t } = useTranslation();

  return (
    <div className={`border rounded-xl p-5 ${
      recommendation.recommended
        ? 'border-green-300 bg-green-50'
        : 'border-gray-200 bg-gray-50'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{t('itinerary.jrPass.title')}</h3>
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
          recommendation.recommended
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-200 text-gray-600'
        }`}>
          {recommendation.recommended
            ? t('itinerary.jrPass.recommended')
            : t('itinerary.jrPass.notRecommended')}
        </span>
      </div>

      {recommendation.recommended && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-xs text-gray-500">{t('itinerary.jrPass.passType')}</p>
              <p className="font-medium text-gray-900">{recommendation.pass_type}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">
                {t('itinerary.jrPass.savings', { amount: recommendation.savings_yen.toLocaleString() })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
            <div>
              <p className="text-gray-500">{t('itinerary.jrPass.individualCost')}</p>
              <p className="font-medium line-through text-red-500">
                ¥{recommendation.individual_tickets_cost_yen.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-500">{t('itinerary.jrPass.passCost')}</p>
              <p className="font-medium text-green-700">
                ¥{recommendation.pass_cost_yen.toLocaleString()}
              </p>
            </div>
          </div>
        </>
      )}

      <p className="text-sm text-gray-600">{recommendation.recommendation_note}</p>

      {recommendation.not_covered_segments.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-medium text-amber-700 mb-1">Not covered by JR Pass:</p>
          <ul className="text-xs text-amber-600 space-y-0.5">
            {recommendation.not_covered_segments.map((seg, i) => (
              <li key={i}>• {seg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
