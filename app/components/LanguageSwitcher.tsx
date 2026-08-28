'use client';

import { locales, useLanguage } from '../lib/i18n';

/**
 * Compact four-locale pill switcher. Persists choice, updates <html lang>,
 * and re-renders every translated surface instantly via LanguageContext.
 */
export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="lang-switcher" role="group" aria-label="Language">
      {locales.map(({ code, native }) => (
        <button
          key={code}
          type="button"
          className={`lang-pill ${locale === code ? 'lang-pill-active' : ''}`}
          aria-pressed={locale === code}
          lang={code === 'zh' ? 'zh-Hans' : code}
          onClick={() => setLocale(code)}
        >
          {native}
        </button>
      ))}
    </div>
  );
}
