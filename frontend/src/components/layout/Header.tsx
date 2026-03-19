import { useTranslation } from 'react-i18next';
import { LanguageToggle } from './LanguageToggle';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🗾</span>
          <h1 className="text-lg font-semibold text-gray-900">{t('app.title')}</h1>
        </div>
        <LanguageToggle />
      </div>
    </header>
  );
}
