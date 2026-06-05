import { useTranslation } from '../i18n/useTranslation'

export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, t } = useTranslation()

  return (
    <div
      className={`inline-flex items-center rounded border border-white/20 overflow-hidden ${className}`}
      role="group"
      aria-label={t('nav.switchLang')}
    >
      <button
        type="button"
        onClick={() => setLang('fr')}
        className={`px-2.5 py-1.5 text-xs font-condensed font-bold tracking-widest uppercase transition-colors ${
          lang === 'fr'
            ? 'bg-red-sc text-white'
            : 'bg-transparent text-white/70 hover:text-white hover:bg-white/10'
        }`}
        aria-pressed={lang === 'fr'}
      >
        {t('nav.langFr')}
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`px-2.5 py-1.5 text-xs font-condensed font-bold tracking-widest uppercase transition-colors ${
          lang === 'en'
            ? 'bg-red-sc text-white'
            : 'bg-transparent text-white/70 hover:text-white hover:bg-white/10'
        }`}
        aria-pressed={lang === 'en'}
      >
        {t('nav.langEn')}
      </button>
    </div>
  )
}
