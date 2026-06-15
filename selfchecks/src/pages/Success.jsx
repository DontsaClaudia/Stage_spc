import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useTranslation } from '../i18n/useTranslation'

const APP_URL = import.meta.env.VITE_APP_URL || 'https://self-checks.fr'

export default function Success() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const missingSession = !sessionId
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(!missingSession)
  const [error, setError] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!sessionId) return

    fetch(`/api/get-session?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.error || t('success.confirmFailed'))
        }
        setSession(data)
      })
      .catch((err) => {
        setError(err.message || t('success.genericError'))
      })
      .finally(() => setLoading(false))
    // Fetch once per session — omit `t` so language switch does not refetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId])

  const displayError = error || (missingSession ? t('success.missingSession') : '')

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 bg-ink pt-24">
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-sc border-t-transparent rounded-full animate-spin" />
          <p className="text-muted text-sm tracking-widest uppercase">{t('success.loading')}</p>
        </div>
      ) : displayError ? (
        <div className="max-w-lg">
          <h1 className="font-condensed font-black text-3xl uppercase text-cream mb-4">
            {t('success.errorTitle')}
          </h1>
          <p className="text-red-400 text-sm leading-relaxed mb-8">{displayError}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-block bg-red-sc hover:bg-red-dark text-white font-condensed font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-sm transition-all duration-200 no-underline"
            >
              {t('success.contactUs')}
            </Link>
            <Link
              to="/"
              className="inline-block border border-white/20 text-cream font-condensed font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-sm transition-all duration-200 no-underline"
            >
              {t('success.homeShort')}
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-lg">
          <div className="w-20 h-20 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-10 h-10 text-green-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <h1 className="font-condensed font-black text-4xl uppercase text-cream mb-4">
            {t('success.title')}
          </h1>

          <p className="text-muted text-sm leading-relaxed mb-8">{t('success.message')}</p>

          {session?.alreadyExists && (
            <p className="text-muted text-xs mb-6">{t('success.alreadyExists')}</p>
          )}

          {session?.token && (
            <div className="bg-navy border border-red-sc/30 rounded-xl p-6 mb-8">
              <p className="text-[0.7rem] tracking-widest uppercase text-red-sc mb-2">
                {t('success.tokenLabel')}
              </p>
              <p className="font-condensed font-black text-2xl text-cream tracking-widest">
                {session.token}
              </p>
              <p className="text-muted text-xs mt-3 leading-relaxed">{t('success.tokenHelp')}</p>
            </div>
          )}

          <div className="bg-navy/50 border border-white/10 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-condensed font-bold text-sm uppercase tracking-widest text-cream mb-4">
              {t('success.nextStepsTitle')}
            </h3>
            <ol className="flex flex-col gap-3">
              {t('success.nextSteps').map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted">
                  <span className="w-5 h-5 min-w-[1.25rem] bg-red-sc rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-sc hover:bg-red-dark text-white font-condensed font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-sm transition-all duration-200 no-underline hover:-translate-y-0.5"
            >
              {t('success.openApp')}
            </a>
            <Link
              to="/"
              className="inline-block border border-white/20 text-cream font-condensed font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-sm transition-all duration-200 no-underline"
            >
              {t('success.home')}
            </Link>
            <Link
              to="/resiliation"
              className="inline-block border border-white/20 text-cream font-condensed font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-sm transition-all duration-200 no-underline"
            >
              {t('success.manage')}
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}
