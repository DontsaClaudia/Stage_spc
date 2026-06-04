import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import { ClipboardList, Target, Trophy, BarChart3 } from 'lucide-react'
import './Concept.css'

const features = [
  {
    Icon: ClipboardList,
    title: 'Questionnaire journalier',
    desc: 'Évaluez votre hygiène de vie et vos sensations après chaque séance.',
  },
  {
    Icon: Target,
    title: 'Fixez vos objectifs',
    desc: 'Définissez jusqu\'à 3 objectifs personnels et suivez votre progression.',
  },
  {
    Icon: Trophy,
    title: 'Retour post-compétition',
    desc: 'Analysez votre ressenti à chaud et à froid après chaque compétition.',
  },
  {
    Icon: BarChart3,
    title: 'Suivi coach',
    desc: 'Les coachs visualisent et comparent les performances de leurs athlètes.',
  },
]

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
  const featuresRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
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

      {/* ── Colonne gauche : photo — slide depuis la gauche ── */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: -70 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative overflow-hidden group min-h-[550px]"
      >
        <img
          src="/images/coaching.jpg"
          alt="Athlète Self Checks"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
        />
        <div className="absolute top-0 right-0 bottom-0 w-1 bg-red-sc z-10" />
      </motion.div>

      {/* ── Colonne droite : texte ── */}
      <div className="relative bg-ink flex flex-col justify-center section-padding overflow-hidden">

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

        <div className="relative z-10">

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 50 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-8"
          >
            <SectionTitle
              align="left"
              label="Notre application"
              title={
                <>
                  Faites de chaque
                  <br />
                  entraînement
                  <br />
                  <span className="text-red-sc">un succès</span>
                </>
              }
            />
          </motion.div>

          {/* Features — système IntersectionObserver conservé */}
          <ul ref={featuresRef} className="flex flex-col gap-4 mb-8 list-none">
            {features.map((feature) => (
              <li key={feature.title} className="feature-item flex items-start gap-4">
                <div className="feature-icon-wrap w-10 h-10 min-w-[2.5rem] bg-red-sc/15 border border-red-sc/30 rounded-lg flex items-center justify-center text-red-sc cursor-default">
                  <feature.Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden />
                </div>
                <div>
                  <strong className="block font-condensed font-bold text-sm tracking-widest uppercase text-cream mb-0.5">
                    {feature.title}
                  </strong>
                  <span className="text-xs text-muted leading-relaxed">{feature.desc}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* Bouton CTA — fade in */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <Link
              to="/application"
              className="clip-skew self-start inline-block bg-red-sc hover:bg-red-dark text-white font-condensed font-bold text-sm tracking-widest uppercase px-8 py-3.5 transition-all duration-200 hover:-translate-y-0.5 no-underline"
            >
              Découvrir l'application
            </Link>
          </motion.div>

        </div>
      </div>

    </section>
  )
}
