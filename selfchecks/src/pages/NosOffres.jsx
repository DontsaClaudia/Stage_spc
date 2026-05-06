import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import CtaBand from '../components/CtaBand'
import { loadStripe } from '@stripe/stripe-js'


// Initialisation de Stripe avec la clé publique
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

// ── Les 4 offres détaillées ──
const offres = [
  {
    tag: '★ Le plus populaire',
    name: 'Démo Gratuite',
    price: 'Gratuit',
    priceId: import.meta.env.VITE_PRICE_GRATUIT,
    period: '30 jours',
    desc: 'La démonstration de notre application permettra aux sportifs de découvrir comment l\'auto-évaluation peut les aider à améliorer leur performance et atteindre leurs objectifs.',
    features: [
      '1 compte sportif ouvert pendant 30 jours',
      'Questionnaire journalier',
      'Fixation d\'objectifs',
      'Retour post-compétition',
      'Carte bancaire requise',
      'Résiliation possible à tout moment',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    featured: true,
    cta: 'Commencer gratuitement',
  },
  {
    tag: 'Sportifs',
    name: 'Sportif',
    price: '15€',
    priceId: import.meta.env.VITE_PRICE_SPORTIF,
    period: 'par an',
    desc: 'L\'application vous permet de vous autoévaluer, fixer vos objectifs personnels et progresser dans votre performance. Enregistrez et analysez facilement vos séances d\'entraînement, compétitions et performances quotidiennes.',
    features: [
      '1 compte sportif',
      'Questionnaire journalier illimité',
      'Fixation d\'objectifs personnels',
      'Retour post-entraînement',
      'Retour post-compétition',
      'Abonnement annuel : 15€',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    featured: false,
    cta: 'Choisir Sportif',
  },
  {
    tag: 'Coachs',
    name: 'Coach',
    price: 'Dès 40€',
    priceId: import.meta.env.VITE_PRICE_COACH_10,
    period: 'par an',
    desc: 'L\'application permet aux coachs d\'évaluer et de suivre la progression des sportifs par rapport aux objectifs fixés. En enregistrant et analysant les performances individuelles, vous pouvez comparer les résultats, identifier les domaines à améliorer et ajuster l\'entraînement.',
    features: [
      '10 sportifs : 40€/an',
      '20 sportifs : 80€/an',
      '+20 sportifs : 120€/an',
      'Tableau de bord coach',
      'Suivi individuel des athlètes',
      'Comparaison des performances',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    featured: false,
    cta: 'Choisir Coach',
  },
  {
    tag: 'Sur mesure',
    name: 'Made by Self Checks',
    price: '1€',
    priceId: import.meta.env.VITE_PRICE_GRATUIT,
    period: 'par sportif',
    desc: 'Lors de votre première connexion à Self Checks, nous vous offrons la possibilité de nous confier la création des comptes de vos sportifs. Cette fonctionnalité vous permettra de gagner du temps et d\'être plus disponible aux côtés de vos joueurs.',
    features: [
      'Création des comptes sportifs',
      'Configuration personnalisée',
      'Accompagnement à la prise en main',
      'Support dédié',
      'Coût par sportif : 1€',
      'Idéal pour les grands clubs',
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    featured: false,
    cta: 'Nous contacter',
  },
]

// ── FAQ ──
const faqs = [
  {
    question: 'Est-ce que je dois entrer ma carte bancaire pour l\'essai gratuit ?',
    answer: 'Oui, une carte bancaire est requise pour démarrer l\'essai gratuit. Vous ne serez pas prélevé pendant les 30 premiers jours. À l\'issue de cette période, si vous ne résiliez pas votre abonnement, le prélèvement correspondant à l\'offre choisie sera effectué automatiquement.',
  },
  {
    question: 'Que se passe-t-il à la fin des 30 jours d\'essai ?',
    answer: 'À la fin de votre période d\'essai, si vous n\'avez pas résilié, vous serez automatiquement prélevé selon l\'offre choisie. Vous pouvez résilier à tout moment avant la fin des 30 jours sans frais.',
  },
  {
    question: 'Puis-je changer d\'offre en cours d\'abonnement ?',
    answer: 'Oui, vous pouvez upgrader votre offre à tout moment. Contactez-nous et nous nous occuperons de la transition.',
  },
  {
    question: 'L\'application est-elle disponible sur iOS et Android ?',
    answer: 'Oui, Self Checks est disponible sur les deux plateformes. Vous pouvez la télécharger gratuitement et commencer votre essai immédiatement.',
  },
  {
    question: 'Comment fonctionne l\'offre Coach ?',
    answer: 'L\'offre Coach vous permet de suivre et d\'évaluer les performances de vos athlètes. Le tarif dépend du nombre de sportifs : 40€ pour 10, 80€ pour 20, et 120€ pour plus de 20 sportifs par an.',
  },
]

// ── Composant FAQ item ──
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-navy/50 hover:bg-navy transition-colors duration-200"
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
        <p className="px-6 py-4 text-sm text-muted leading-relaxed bg-navy/20">
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function NosOffres() {
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const [loading, setLoading] = useState(null) 

 const handleCheckout = async (priceId, name) => {

  if (!priceId) {
    window.location.href = '/contact'
    return
  }

  setLoading(name)

  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId,
        offre: name,
      }),
    })

    const { sessionId } = await response.json()

    const stripe = await stripePromise
    await stripe.redirectToCheckout({ sessionId })

  } catch (error) {
    console.error('Erreur Stripe :', error)
  } finally {
    setLoading(null)
  }
}
  return (
    <>
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
          <p className="font-condensed font-bold text-sm tracking-[0.3em] uppercase text-red-sc mb-4">
            Tarification
          </p>
          <h1
            className="font-condensed font-black uppercase leading-none text-cream mb-4"
            style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}
          >
            Nos Offres
          </h1>
          <p className="text-muted max-w-xl mx-auto text-base leading-relaxed">
            Choisissez l'offre qui correspond à vos besoins. Commencez gratuitement pendant 30 jours. Carte bancaire requise, résiliez à tout moment avant la fin de la période d'essai.
          </p>
        </div>
      </section>

{/* ── OFFRES ── */}
<section className="py-20 px-8 relative overflow-hidden">

  {/* ── Fond lignes animées style GitHub ── */}
<div className="absolute inset-0 z-0 overflow-hidden">
  <div className="absolute inset-0 bg-ink" />
  <svg
    className="absolute inset-0 w-full h-full"
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
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-sc/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-navy/50 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-sc/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
    <div className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-red-sc/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }} />
    {/* Zone claire centrale comme GitHub */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl"
    style={{ background: 'radial-gradient(ellipse, rgba(227,6,19,0.12) 0%, rgba(26,50,96,0.15) 40%, transparent 70%)' }}
    />
</div>

  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
    {offres.map(({ tag, name, price, period, desc, features, icon, featured, cta, priceId  }, i) => (
      <div
        key={i}
        className={`offre-row group flex flex-row items-stretch rounded-xl border overflow-hidden transition-all duration-500 hover:-translate-y-1
          ${featured
            ? 'border-red-sc/50 bg-red-sc/15 hover:bg-red-sc/20 hover:shadow-xl hover:shadow-red-sc/20'
            : 'border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15 hover:shadow-xl hover:shadow-black/30'
          }`}
        style={{ animationDelay: `${i * 0.15}s` }}
      >
        {/* ── Colonne gauche : icône + nom + prix ── */}
        <div className={`flex flex-col justify-center items-start gap-3 p-6 min-w-[160px]
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
            onClick={() => handleCheckout(priceId, name)}
            disabled={loading === name}
            className={`self-start font-condensed font-bold text-sm tracking-widest uppercase py-2.5 px-6 rounded-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer
                ${featured
                ? 'bg-white text-red-sc hover:bg-white/90'
                : 'bg-red-sc hover:bg-red-dark text-white hover:shadow-lg hover:shadow-red-sc/30'
                }
                ${loading === name ? 'opacity-70 cursor-wait' : ''}
            `}
            >
            {loading === name ? (
                <span className="flex items-center gap-2">
                <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                </svg>
                Chargement...
                </span>
            ) : cta}
            </button>
        </div>

      </div>
    ))}
  </div>
</section>

      {/* ── FAQ ── */}
      <section className="py-20 px-8 bg-navy">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-condensed font-bold text-sm tracking-[0.3em] uppercase text-red-sc mb-3">
              Questions fréquentes
            </p>
            <h2
              className="font-condensed font-black uppercase leading-none text-cream"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              FAQ
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map(({ question, answer }, i) => (
              <FaqItem key={i} question={question} answer={answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <CtaBand />
    </>
  )
}