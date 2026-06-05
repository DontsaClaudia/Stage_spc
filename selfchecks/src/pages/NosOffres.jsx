import { useState, useEffect, useMemo } from 'react'
import useReveal from '../hooks/useReveal'
import CtaBand from '../components/CtaBand'
import SectionTitle from '../components/SectionTitle'
import { useTranslation } from '../i18n/useTranslation'
import { buildOffers } from '../data/offerMeta'

// ── Composant FAQ item ──
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-8 py-2 text-left bg-navy/50 hover:bg-navy transition-colors duration-200"
      >
        <span className="font-condensed font-bold text-base uppercase tracking-wide text-cream">
          {question}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={`w-5 h-5 text-red-sc transition-transform duration-300 min-w-[1.25rem] ${open ? 'rotate-45' : ''}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40' : 'max-h-0'}`}>
        <p className="px-8 py-3 text-sm text-muted leading-relaxed bg-navy/20">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function NosOffres() {
  const { t } = useTranslation()
  const offres = useMemo(() => buildOffers(t), [t])
  const faqs = t('nosOffres.faq')

  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const [loading, setLoading] = useState(null)
  const [checkoutError, setCheckoutError] = useState('')

  const handleCheckout = async (priceId, stripeOffre, offerId) => {
    if (!priceId) {
      setCheckoutError(t('nosOffres.errors.notConfigured'))
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setLoading(offerId)
    setCheckoutError('')

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          offre: stripeOffre,
        }),
      })

      let data = {}
      try {
        data = await response.json()
      } catch {
        throw new Error(
          response.status === 404
            ? t('nosOffres.errors.apiMissing')
            : t('nosOffres.errors.invalidResponse')
        )
      }

      if (!response.ok) {
        throw new Error(data.error || t('nosOffres.errors.stripe'))
      }

      if (!data.url) {
        throw new Error(t('nosOffres.errors.missingUrl'))
      }

      window.location.assign(data.url)
    } catch (error) {
      console.error('Erreur Stripe :', error)
      setCheckoutError(error.message)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setLoading(null)
    }
  }
  return (
    <>
      {checkoutError && (
        <div
          role="alert"
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[calc(100%-2rem)] text-center text-red-100 text-sm bg-red-950/95 border border-red-sc/50 rounded-lg px-4 py-3 shadow-xl"
        >
          {checkoutError}
        </div>
      )}

      {/* ── HERO ── */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center text-center px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/athlete3.avif"
            alt="fond"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/75" />
        </div>
        <div className="relative z-10 pt-24">
          <SectionTitle
            as="h1"
            size="hero"
            label={t('nosOffres.label')}
            title={t('nosOffres.title')}
            titleClassName="mb-4"
          />
          <p className="text-muted max-w-xl mx-auto text-base leading-relaxed">
            {t('nosOffres.subtitle')}
          </p>
        </div>
      </section>

{/* ── OFFRES ── */}
<section className="section-padding relative overflow-hidden">

  {/* ── Fond lignes animées style GitHub ── */}
<div className="absolute inset-0 z-0 overflow-hidden">
  <div className="absolute inset-0 bg-ink" />
  <svg
    className="decorative-svg absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      {/* Dégradé rouge */}
      <linearGradient id="line1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E30613" stopOpacity="0" />
        <stop offset="50%" stopColor="#E30613" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#E30613" stopOpacity="0" />
      </linearGradient>
      {/* Dégradé navy */}
      <linearGradient id="line2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1a3260" stopOpacity="0" />
        <stop offset="50%" stopColor="#1a3260" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#1a3260" stopOpacity="0" />
      </linearGradient>
      {/* Dégradé blanc subtil */}
      <linearGradient id="line3" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="white" stopOpacity="0" />
        <stop offset="50%" stopColor="white" stopOpacity="0.08" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Ligne courbe 1 — rouge */}
    <path
      d="M -100 400 Q 200 100 500 300 T 1100 200 T 1700 400"
      fill="none"
      stroke="url(#line1)"
      strokeWidth="1.5"
    >
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0; 30,-20; 0,0"
        dur="8s"
        repeatCount="indefinite"
      />
    </path>

    {/* Ligne courbe 2 — navy */}
    <path
      d="M -100 200 Q 300 500 700 200 T 1400 300 T 1800 100"
      fill="none"
      stroke="url(#line2)"
      strokeWidth="1.5"
    >
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0; -20,30; 0,0"
        dur="10s"
        repeatCount="indefinite"
      />
    </path>

    {/* Ligne courbe 3 — blanche subtile */}
    <path
      d="M 200 -100 Q 500 300 300 600 T 600 900 T 900 600"
      fill="none"
      stroke="url(#line3)"
      strokeWidth="1"
    >
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0; 15,25; 0,0"
        dur="12s"
        repeatCount="indefinite"
      />
    </path>

    {/* Ligne courbe 4 — rouge fine */}
    <path
      d="M 1800 600 Q 1400 200 1000 400 T 400 200 T -100 400"
      fill="none"
      stroke="url(#line1)"
      strokeWidth="0.8"
      strokeOpacity="0.5"
    >
      <animateTransform
        attributeName="transform"
        type="translate"
        values="0,0; -25,-15; 0,0"
        dur="9s"
        repeatCount="indefinite"
      />
    </path>

    {/* Points lumineux */}
    {[
      { cx: 300, cy: 200, r: 2, dur: '4s' },
      { cx: 700, cy: 400, r: 1.5, dur: '6s' },
      { cx: 1100, cy: 150, r: 2, dur: '5s' },
      { cx: 500, cy: 500, r: 1.5, dur: '7s' },
      { cx: 900, cy: 300, r: 2, dur: '3s' },
    ].map(({ cx, cy, r, dur }, i) => (
      <circle key={i} cx={cx} cy={cy} r={r} fill="#E30613">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur={dur}
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values={`${r};${r * 2};${r}`}
          dur={dur}
          repeatCount="indefinite"
        />
      </circle>
    ))}

  </svg>

  {/* Halos colorés lumineux */}
    <div className="decorative-halo absolute top-1/4 left-1/4 w-96 h-96 bg-red-sc/10 rounded-full blur-3xl animate-pulse" />
    <div className="decorative-halo absolute bottom-1/4 right-1/4 w-96 h-96 bg-navy/50 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    <div className="decorative-halo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-sc/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
    <div className="decorative-halo absolute bottom-1/3 left-1/4 w-56 h-56 bg-red-sc/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
    {/* Zone claire centrale comme GitHub */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl"
    style={{ background: 'radial-gradient(ellipse, rgba(227,6,19,0.12) 0%, rgba(26,50,96,0.15) 40%, transparent 70%)' }}
    />
</div>

  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
    {offres.map(({ id, tag, name, price, period, desc, features, icon, featured, cta, priceId, stripeOffre }, i) => (
      <div
        key={i}
        className={`offre-row group flex flex-col md:flex-row items-stretch rounded-xl border overflow-hidden transition-all duration-500 md:hover:-translate-y-1
          ${featured
            ? 'border-red-sc/50 bg-red-sc/15 hover:bg-red-sc/20 hover:shadow-xl hover:shadow-red-sc/20'
            : 'border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15 hover:shadow-xl hover:shadow-black/30'
          }`}
        style={{ animationDelay: `${i * 0.15}s` }}
      >
        {/* ── Colonne gauche : icône + nom + prix ── */}
        <div className={`flex flex-col justify-center items-start gap-3 p-6 w-full md:w-auto md:min-w-[160px] border-b md:border-b-0 border-white/10
          ${featured ? 'bg-red-sc/20' : 'bg-white/2'}
        `}>
          {/* Ligne rouge animée */}
          <div className={`w-1 h-8 rounded-full mb-1 transition-all duration-300 group-hover:h-16
            ${featured ? 'bg-white' : 'bg-red-sc'}
          `} />

          {/* Icône */}
          <div className={featured ? 'text-white' : 'text-red-sc'}>
            {icon}
          </div>

          {/* Tag */}
          <span className={`text-[0.6rem] tracking-widest uppercase font-bold ${
            featured ? 'text-white/60' : 'text-red-sc/70'
          }`}>
            {tag}
          </span>

          {/* Nom */}
          <h2 className="font-condensed font-black text-xl uppercase leading-tight text-white">
            {name}
          </h2>

          {/* Prix */}
          <div className="flex items-end gap-1">
            <span className={`font-condensed font-black text-2xl leading-none ${
              featured ? 'text-white' : 'text-red-sc'
            }`}>
              {price}
            </span>
            <span className="text-white/40 text-xs mb-0.5">{period}</span>
          </div>
        </div>

        {/* ── Colonne droite : description + features + bouton ── */}
        <div className="flex-1 flex flex-col justify-between gap-4 p-6">
          {/* Description */}
          <p className={`text-xs leading-relaxed ${
            featured ? 'text-white/80' : 'text-muted'
          }`}>
            {desc}
          </p>

          {/* Features */}
          <ul className="grid grid-cols-1 gap-1.5">
            {features.slice(0, 4).map((f, j) => (
              <li key={j} className="flex items-center gap-2 text-xs">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}
                  className={`w-3 h-3 min-w-[0.75rem] ${featured ? 'text-white' : 'text-red-sc'}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className={featured ? 'text-white/80' : 'text-muted'}>
                  {f}
                </span>
              </li>
            ))}
          </ul>

         {/* Bouton */}
            <button
            onClick={() => handleCheckout(priceId, stripeOffre, id)}
            disabled={loading === id}
            className={`self-start font-condensed font-bold text-sm tracking-widest uppercase py-2.5 px-6 rounded-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer
                ${featured
                ? 'bg-white text-red-sc hover:bg-white/90'
                : 'bg-red-sc hover:bg-red-dark text-white hover:shadow-lg hover:shadow-red-sc/30'
                }
                ${loading === id ? 'opacity-70 cursor-wait' : ''}
            `}
            >
            {loading === id ? (
                <span className="flex items-center gap-2">
                <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                </svg>
                {t('nosOffres.loading')}
                </span>
            ) : cta}
            </button>
        </div>

      </div>
    ))}
  </div>
</section>

      {/* ── FAQ ── */}
      <section className="section-padding bg-navy">
        <div className="max-w-3xl mx-auto">
          <SectionTitle
            label={t('nosOffres.faqLabel')}
            title={t('nosOffres.faqTitle')}
            className="mb-12"
          />
          <div className="flex flex-col gap-3">
            {faqs.map(({ q, a }, i) => (
              <FaqItem key={i} question={q} answer={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <CtaBand />
    </>
  )
}