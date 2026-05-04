import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import './Concept.css'

// Features avec icônes — apparaissent une par une au scroll
const features = [
  {
    icon: '📋',
    title: 'Questionnaire journalier',
    desc: 'Évaluez votre hygiène de vie et vos sensations après chaque séance.',
  },
  {
    icon: '🎯',
    title: 'Fixez vos objectifs',
    desc: 'Définissez jusqu\'à 3 objectifs personnels et suivez votre progression.',
  },
  {
    icon: '🏆',
    title: 'Retour post-compétition',
    desc: 'Analysez votre ressenti à chaud et à froid après chaque compétition.',
  },
  {
    icon: '📊',
    title: 'Suivi coach',
    desc: 'Les coachs visualisent et comparent les performances de leurs athlètes.',
  },
]

// Lignes verticales animées — positions et vitesses aléatoires
const lines = [
  { left: '10%', height: '40%', duration: '4s', delay: '0s' },
  { left: '25%', height: '60%', duration: '6s', delay: '1s' },
  { left: '40%', height: '30%', duration: '5s', delay: '2s' },
  { left: '55%', height: '50%', duration: '7s', delay: '0.5s' },
  { left: '70%', height: '45%', duration: '4.5s', delay: '1.5s' },
  { left: '85%', height: '35%', duration: '6.5s', delay: '3s' },
  { left: '92%', height: '55%', duration: '5.5s', delay: '2.5s' },
]

export default function Concept() {
  // Ref sur la colonne droite pour observer les features
  const featuresRef = useRef(null)

  useEffect(() => {
    // Observer qui déclenche l'apparition des features au scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // On ajoute visible à chaque feature-item
            const items = e.target.querySelectorAll('.feature-item')
            items.forEach((item) => item.classList.add('visible'))
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (featuresRef.current) observer.observe(featuresRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="grid md:grid-cols-2 min-h-[550px]">

      {/* ── Colonne gauche : photo athlète ── */}
      <div className="relative overflow-hidden group min-h-[550px]">
        <img
          src="/images/concept2.webp"
          alt="Athlète Self Checks"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
        />
        {/* Bordure rouge à droite */}
        <div className="absolute top-0 right-0 bottom-0 w-1 bg-red-sc z-10" />
      </div>

      {/* ── Colonne droite : texte + features ── */}
      <div className="relative bg-ink flex flex-col justify-center px-12 py-16 overflow-hidden">

        {/* Lignes animées en arrière-plan */}
        <div className="concept-bg">
          {lines.map(({ left, height, duration, delay }, i) => (
            <div
              key={i}
              className="concept-line"
              style={{ left, height, animationDuration: duration, animationDelay: delay }}
            />
          ))}
        </div>

        {/* Contenu — au dessus des lignes */}
        <div className="relative z-10">
          <p className="text-[0.72rem] tracking-[0.3em] uppercase text-red-sc mb-3">
            Notre application
          </p>

          <h2
            className="font-condensed font-black uppercase leading-none text-cream mb-8"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)' }}
          >
            Faites de chaque<br />
            entraînement<br />
            <span className="text-red-sc">un succès</span>
          </h2>

          {/* Liste de features */}
          <ul ref={featuresRef} className="flex flex-col gap-4 mb-8 list-none">
            {features.map(({ icon, title, desc }) => (
              <li key={title} className="feature-item flex items-start gap-4">
                {/* Icône dans un carré rouge */}
                <div className="feature-icon-wrap w-10 h-10 min-w-[2.5rem] bg-red-sc/15 border border-red-sc/30 rounded-lg flex items-center justify-center text-lg cursor-default">
                  {icon}
                </div>
                <div>
                  <strong className="block font-condensed font-bold text-sm tracking-widest uppercase text-cream mb-0.5">
                    {title}
                  </strong>
                  <span className="text-xs text-muted leading-relaxed">{desc}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* Bouton CTA */}
          <Link
            to="/application"
            className="clip-skew self-start inline-block bg-red-sc hover:bg-red-dark text-white font-condensed font-bold text-sm tracking-widest uppercase px-8 py-3.5 transition-all duration-200 hover:-translate-y-0.5 no-underline"
          >
            Découvrir l'application
          </Link>
        </div>

      </div>

    </section>
  )
}