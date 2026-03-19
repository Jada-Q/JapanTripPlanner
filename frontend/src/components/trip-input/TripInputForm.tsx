import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import type { TripRequest, BudgetLevel, TravelPace, InterestTag } from '../../types/request';

const CITY_OPTIONS = [
  { value: 'tokyo', labelEn: 'Tokyo', labelZh: '东京', labelJa: '東京' },
  { value: 'kyoto', labelEn: 'Kyoto', labelZh: '京都', labelJa: '京都' },
  { value: 'osaka', labelEn: 'Osaka', labelZh: '大阪', labelJa: '大阪' },
  { value: 'hiroshima', labelEn: 'Hiroshima', labelZh: '广岛', labelJa: '広島' },
  { value: 'nara', labelEn: 'Nara', labelZh: '奈良', labelJa: '奈良' },
  { value: 'hakone', labelEn: 'Hakone', labelZh: '箱根', labelJa: '箱根' },
  { value: 'kamakura', labelEn: 'Kamakura', labelZh: '镰仓', labelJa: '鎌倉' },
  { value: 'kanazawa', labelEn: 'Kanazawa', labelZh: '金泽', labelJa: '金沢' },
  { value: 'fukuoka', labelEn: 'Fukuoka', labelZh: '福冈', labelJa: '福岡' },
  { value: 'nagoya', labelEn: 'Nagoya', labelZh: '名古屋', labelJa: '名古屋' },
  { value: 'sapporo', labelEn: 'Sapporo', labelZh: '札幌', labelJa: '札幌' },
  { value: 'sendai', labelEn: 'Sendai', labelZh: '仙台', labelJa: '仙台' },
  { value: 'nikko', labelEn: 'Nikko', labelZh: '日光', labelJa: '日光' },
  { value: 'takayama', labelEn: 'Takayama', labelZh: '高山', labelJa: '高山' },
  { value: 'kobe', labelEn: 'Kobe', labelZh: '神户', labelJa: '神戸' },
];

const INTEREST_OPTIONS: InterestTag[] = [
  'temples', 'food', 'shopping', 'nature', 'anime',
  'history', 'onsen', 'nightlife', 'photography', 'family',
];

interface Props {
  onSubmit: (request: TripRequest) => void;
  isLoading: boolean;
}

export function TripInputForm({ onSubmit, isLoading }: Props) {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language.startsWith('zh');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [budget, setBudget] = useState<BudgetLevel>('moderate');
  const [pace, setPace] = useState<TravelPace>('moderate');
  const [interests, setInterests] = useState<InterestTag[]>([]);

  const citySelectOptions = CITY_OPTIONS.map(c => ({
    value: c.value,
    label: isZh ? `${c.labelZh} (${c.labelJa})` : `${c.labelEn} (${c.labelJa})`,
  }));

  const toggleInterest = (tag: InterestTag) => {
    setInterests(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || cities.length === 0) return;

    onSubmit({
      start_date: startDate,
      end_date: endDate,
      cities,
      budget_level: budget,
      pace,
      interests,
      include_jr_pass_calc: true,
      language: isZh ? 'zh' : 'en',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Dates */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t('form.dates')}</label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">{t('form.startDate')}</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">{t('form.endDate')}</label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              min={startDate}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
      </div>

      {/* Cities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t('form.cities')}</label>
        <Select
          isMulti
          options={citySelectOptions}
          placeholder={t('form.citiesPlaceholder')}
          onChange={selected => setCities(selected ? selected.map(s => s.value) : [])}
          className="text-sm"
        />
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t('form.budget')}</label>
        <div className="grid grid-cols-3 gap-2">
          {(['budget', 'moderate', 'luxury'] as BudgetLevel[]).map(level => (
            <button
              key={level}
              type="button"
              onClick={() => setBudget(level)}
              className={`py-2 px-3 text-sm rounded-lg border transition-colors ${
                budget === level
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {t(`form.budgetOptions.${level}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Pace */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t('form.pace')}</label>
        <div className="grid grid-cols-3 gap-2">
          {(['relaxed', 'moderate', 'intensive'] as TravelPace[]).map(p => (
            <button
              key={p}
              type="button"
              onClick={() => setPace(p)}
              className={`py-2 px-3 text-sm rounded-lg border transition-colors ${
                pace === p
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {t(`form.paceOptions.${p}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{t('form.interests')}</label>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleInterest(tag)}
              className={`py-1.5 px-3 text-sm rounded-full border transition-colors ${
                interests.includes(tag)
                  ? 'bg-blue-50 border-blue-500 text-blue-700'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {t(`form.interestOptions.${tag}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading || !startDate || !endDate || cities.length === 0}
        className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {t('form.generating')}
          </span>
        ) : (
          t('form.generate')
        )}
      </button>
    </form>
  );
}
