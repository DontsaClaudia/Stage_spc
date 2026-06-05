import { useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import { useTranslation } from '../i18n/useTranslation'
import { Gift, Timer, ClipboardList, Star } from 'lucide-react'
import './OffresApercu.css'

const OFFER_CARDS = [
  { id: 'demo', Icon: Gift, featured: true },
  { id: 'sportif', Icon: Timer, featured: false },
  { id: 'coach', Icon: ClipboardList, featured: false },
  { id: 'madeBy', Icon: Star, featured: false },
]

// Variants Framer Motion pour les cartes en cascade
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden:   { opacity: 0, y: 45, scale: 0.96 },
  visible:  { opacity: 1, y: 0,  scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

// Carte individuelle avec spotlight souris
function OffreCard({ offre, ctaLabel }) {
  const { tag, name, price, desc, Icon, featured } = offre
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      className={`offre-card ${featured ? 'featured' : ''}`}
    >
      {/* Overlay spotlight qui suit la souris */}
      <div className="card-spotlight" />

      {/* Tag */}
      <span className={`text-xs tracking-widest uppercase font-semibold ${
        featured ? 'text-white/70' : 'text-red-sc'
      }`}>
        {tag}
      </span>

      {/* Icône animée au hover */}
      <div className={`card-icon w-10 h-10 rounded-lg flex items-center justify-center
        ${featured
          ? 'bg-white/20 text-white'
          : 'bg-red-sc/15 border border-red-sc/30 text-red-sc'
        }`}
      >
        <Icon size={20} strokeWidth={1.75} />
      </div>

      {/* Nom */}
      <div className="font-condensed font-black text-3xl uppercase leading-tight whitespace-pre-line text-white">
        {name}
      </div>

      {/* Prix */}
      <div className={`font-condensed font-bold text-xl ${
        featured ? 'text-white' : 'text-red-sc'
      }`}>
        {price}
      </div>

      {/* Description */}
      <p className={`text-sm leading-relaxed flex-1 ${
        featured ? 'text-white/85' : 'text-white/60'
      }`}>
        {desc}
      </p>

      {/* Bouton */}
      <Link
        to="/offres"
        className={`text-center font-condensed font-bold text-sm tracking-widest uppercase py-3 px-4 rounded-lg transition-all duration-200 no-underline border mt-2
          ${featured
            ? 'bg-white text-red-sc border-white hover:bg-white/90'
            : 'bg-transparent text-white border-white/30 hover:border-white hover:bg-white/10'
          }`}
      >
        {ctaLabel}
      </Link>
    </motion.div>
  )
}

export default function OffresApercu() {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const offres = useMemo(
    () =>
      OFFER_CARDS.map(({ id, Icon, featured }) => {
        const copy = t(`offresApercu.offers.${id}`)
        return { Icon, featured, ...copy }
      }),
    [t]
  )

  return (
    <section className="relative section-padding overflow-hidden">

      {/* ── Image de fond ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/offre.jpg"
          alt="fond"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/40" />
      </div>

      {/* ── Contenu ── */}
      <div className="relative z-10">

        {/* En-tête animé */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12"
        >
          <SectionTitle label={t('offresApercu.label')} title={t('offresApercu.title')} />
        </motion.div>

        {/* Grille des cartes — entrée en cascade */}
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? false : 'hidden'}
          whileInView={reduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {offres.map((offre, i) => (
            <OffreCard key={i} offre={offre} ctaLabel={t('offresApercu.getOffer')} />
          ))}
        </motion.div>

        {/* Bouton bas */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            to="/offres"
            className="clip-skew inline-block bg-red-sc hover:bg-red-dark text-white font-condensed font-bold text-sm tracking-widest uppercase px-10 py-4 transition-all duration-200 hover:-translate-y-0.5 no-underline"
          >
            {t('offresApercu.viewAll')}
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
