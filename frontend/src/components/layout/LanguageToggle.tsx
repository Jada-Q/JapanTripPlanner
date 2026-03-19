import { useTranslation } from 'react-i18next';

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const isZh = i18n.language.startsWith('zh');

  return (
    <button
      onClick={() => i18n.changeLanguage(isZh ? 'en' : 'zh')}
      className="px-3 py-1.5 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
    >
      {isZh ? 'EN' : '中文'}
    </button>
  );
}
