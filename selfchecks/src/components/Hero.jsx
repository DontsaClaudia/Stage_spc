import { Link } from 'react-router-dom'

// Les 3 panels du hero
// bg : dégradé temporaire en attendant les vraies photos
// label : texte indicatif pour savoir quelle photo mettre ici plus tard
const panels = [
  { label: 'Athlète — Sprint', bg: 'from-[#2a1f2e] to-[#1a0a14]' },
  { label: 'Athlète — Trail',  bg: 'from-[#1a2f1a] to-[#0d1e0d]' },
  { label: 'Athlète — Vélo',   bg: 'from-[#1a1a3e] to-[#0d0d2e]' },
]

export default function Hero() {
  return (
    // Section pleine hauteur (100vh) divisée en 3 colonnes égales
    // overflow-hidden : empêche les images de déborder lors du zoom au hover
    <section className="relative h-[90vh] grid grid-cols-3 overflow-hidden">

      {/* ── Les 3 panels ── */}
      {/* On boucle sur le tableau panels pour éviter de répéter 3 fois le même code */}
      {panels.map(({ label, bg }, i) => (
        <div key={i} className="relative overflow-hidden group">

          {/* Placeholder dégradé — à remplacer plus tard par :
              <img src="/images/athlete1.jpg" className="w-full h-full object-cover" /> */}
          <div className={`w-full h-full bg-gradient-to-br ${bg} flex items-end p-8 transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 group-hover:-translate-y-2`}>
            {/* group-hover:scale-105 : zoom léger sur l'image au survol */}
            <span className="font-condensed font-bold text-xs tracking-widest uppercase text-white/20">
              {label}
            </span>
          </div>

          {/* Dégradé noir en bas de chaque panel
              Permet de lire le texte superposé même sur une photo claire */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent pointer-events-none" />

          {/* Ligne rouge verticale entre les panels (pas sur le dernier) */}
          {i < 2 && (
            <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-red-sc z-10" />
          )}
        </div>
      ))}

      {/* ── Calque central : titre + slogan ──
          position absolute + inset-0 : couvre toute la section par dessus les panels
          pointer-events-none : les clics "passent à travers" ce calque vers les panels */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none text-center px-4 animate-fadeup">

        {/* clamp() : taille de police fluide qui s'adapte à la largeur de l'écran */}
        <h1
          className="font-condensed font-black uppercase leading-none"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', textShadow: '0 4px 40px rgba(0,0,0,0.85)' }}
        >
          Self
          <span className="block text-red-sc">Checks</span>
        </h1>

        <p
          className="mt-4 font-condensed font-semibold tracking-[0.25em] uppercase text-cream/80"
          style={{ fontSize: 'clamp(0.7rem, 1.2vw, 1rem)', textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}
        >
          <span className="text-red-sc">Évaluez-vous</span>
          &nbsp;·&nbsp;Défiez-vous&nbsp;·&nbsp;Dépassez-vous
        </p>
      </div>

      {/* ── Boutons CTA en bas au centre ──
          pointer-events-auto : on réactive les clics uniquement sur les boutons */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3 animate-fadeup-slow pointer-events-auto">
        <Link
          to="/offres"
          className="clip-skew bg-red-sc hover:bg-red-dark text-white font-condensed font-bold text-sm tracking-widest uppercase px-8 py-3.5 transition-all duration-200 hover:-translate-y-0.5 no-underline"
        >
          Découvrir l'offre
        </Link>
        <Link
          to="/application"
          className="clip-skew border-2 border-white/30 hover:border-white text-white font-condensed font-bold text-sm tracking-widest uppercase px-8 py-3.5 transition-all duration-200 hover:-translate-y-0.5 no-underline"
        >
          Notre Application
        </Link>
      </div>

      {/* ── Indicateur de scroll ──
          La ligne rouge animée en bas à droite invite l'utilisateur à scroller */}
      <div className="absolute bottom-4 right-8 z-20 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-red-sc to-transparent animate-line" />
        <span
          className="text-white/30 text-[0.6rem] tracking-[0.2em] uppercase"
          style={{ writingMode: 'vertical-rl' }} // texte vertical
        >
          Scroll
        </span>
      </div>

    </section>
  )
}