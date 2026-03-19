import { useTranslation } from 'react-i18next';
import { TripInputForm } from '../components/trip-input/TripInputForm';
import type { TripRequest } from '../types/request';

interface Props {
  onSubmit: (request: TripRequest) => void;
  isLoading: boolean;
}

export function LandingPage({ onSubmit, isLoading }: Props) {
  const { t } = useTranslation();

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          🗾 {t('app.title')}
        </h1>
        <p className="text-gray-600">{t('app.subtitle')}</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <TripInputForm onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
