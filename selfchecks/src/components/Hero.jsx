import { Link } from 'react-router-dom'

const panels = [
  { label: 'Athlète 1', img: '/images/athlete1.avif' },
  { label: 'Athlète 2', img: '/images/athlete2.avif' },
  { label: 'Athlète 3', img: '/images/athlete3.avif' },
]

// Stats affichées en bas du Hero
const stats = [
  { number: '30J',  label: 'Essai gratuit',       img: '/images/sale.png' },
  { number: '12',    label: 'Profils disponibles',  img: '/images/profil.png' },
  { number: '24/7', label: 'Disponibilité',        img: '/images/dispo.png' },
  { number: '100%', label: 'Auto-évaluation',      img: '/images/test.png' },
]

export default function Hero() {
  return (
    <section className="relative h-[100vh] grid grid-cols-3 overflow-hidden">

      {/* ── Les 3 panels photo ── */}
      {panels.map(({ label, img }, i) => (
        <div key={i} className="relative overflow-hidden group">
          <img
            src={img}
            alt={label}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
          />
          {/* Dégradé sombre en bas pour lisibilité du texte */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent pointer-events-none" />
          {/* Ligne rouge séparatrice */}
          {i < 2 && (
            <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-red-sc z-10" />
          )}
        </div>
      ))}

      {/* ── Titre + slogan centré ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none text-center px-4 animate-fadeup">
        <h1
          className="font-condensed font-black uppercase leading-none"
          style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', textShadow: '0 4px 40px rgba(0,0,0,0.85)' }}
        >
          Self
          <span className="block text-red-sc">Checks</span>
        </h1>
        <p
          className="mt-4 font-condensed font-semibold tracking-[0.25em] uppercase text-cream/80"
          style={{ fontSize: 'clamp(0.8rem, 1.4vw, 1.1rem)', textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}
        >
          <span className="text-red-sc">Évaluez-vous</span>
          &nbsp;·&nbsp;Défiez-vous&nbsp;·&nbsp;Dépassez-vous
        </p>
      </div>

      {/* ── Boutons CTA ── */}
    <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-3 animate-fadeup-slow pointer-events-auto">
      
      {/* Bouton principal — essai gratuit bien visible */}
      <Link
        to="/offres"
        className="relative overflow-hidden bg-red-sc hover:bg-red-dark text-white font-condensed font-bold tracking-widest uppercase px-10 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-sc/50 no-underline rounded-sm group"
        style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}
      >
        {/* Shimmer au hover */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
        🎁 Essayer gratuitement — 30 jours offerts
      </Link>

      {/* Bouton secondaire — notre application */}
      <Link
        to="/application"
        className="border-2 border-white/50 hover:border-white text-white font-condensed font-bold text-sm tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:-translate-y-0.5 no-underline rounded-sm"
      >
        Notre Application
      </Link>

    </div>

{/* ── Stats intégrées en bas du Hero ── */}
<div className="absolute bottom-10 left-0 right-0 z-20 flex items-center justify-center gap-4 px-8">
  {stats.map(({ number, label, img }, i) => (
    <div
      key={i}
      // rounded-xl : coins arrondis
      // hover:-translate-y-2 : surélèvement au hover
      // hover:shadow-xl : ombre qui apparaît au hover
      className="flex items-center gap-3 bg-ink/50 backdrop-blur-sm border border-white/15 px-5 py-3 rounded-xl hover:-translate-y-2 hover:shadow-xl hover:shadow-black/40 hover:bg-red-sc/30 hover:border-red-sc/40 transition-all duration-300 cursor-default"
    >
      {/* Icône */}
      <img src={img} alt={label} className="w-8 h-8" />
      <div className="flex flex-col">
        {/* Chiffre */}
        <span className="font-condensed font-black text-white text-xl leading-none">
          {number}
        </span>
        {/* Label */}
        <span className="text-[0.6rem] tracking-widest uppercase text-white/60 mt-0.5">
          {label}
        </span>
      </div>
    </div>
  ))}
</div>

      {/* ── Indicateur scroll centré ── */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
        <span className="text-white/25 text-[0.5rem] tracking-[0.25em] uppercase mb-0.5">Scroll</span>
        <svg className="w-5 h-5 text-white/50 animate-scroll-chevron-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
        <svg className="w-5 h-5 text-white/25 -mt-2.5 animate-scroll-chevron-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

    </section>
  )
}