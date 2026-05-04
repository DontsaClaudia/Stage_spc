import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Gift, Timer, ClipboardList, Star } from 'lucide-react'
import './OffresApercu.css'

const offres = [
  {
    tag: '★ Populaire',
    name: 'Démo\nGratuite',
    price: '30 jours offerts',
    desc: 'Découvrez l\'application gratuitement pendant 30 jours.',
    Icon: Gift,
    featured: true,
  },
  {
    tag: 'Sportifs',
    name: 'Sportif',
    price: '15€ / an',
    desc: 'Auto-évaluation complète et suivi de vos performances.',
    Icon: Timer,
    featured: false,
  },
  {
    tag: 'Coachs',
    name: 'Coach',
    price: 'Dès 40€ / an',
    desc: 'Suivez et évaluez la progression de vos athlètes.',
    Icon: ClipboardList,
    featured: false,
  },
  {
    tag: 'Sur mesure',
    name: 'Made by\nSelf Checks',
    price: '1€ / sportif',
    desc: 'On crée les comptes de vos sportifs pour vous.',
    Icon: Star,
    featured: false,
  },
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
function OffreCard({ offre }) {
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
        Obtenir
      </Link>
    </motion.div>
  )
}

export default function OffresApercu() {
  return (
    <section className="relative py-20 px-8 overflow-hidden">

      {/* ── Image de fond ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/athlete2.avif"
          alt="fond"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/40" />
      </div>

      {/* ── Contenu ── */}
      <div className="relative z-10">

        {/* En-tête animé */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <p className="text-[0.72rem] tracking-[0.3em] uppercase text-red-sc mb-3">
            Tarification
          </p>
          <h2
            className="font-condensed font-black uppercase leading-none text-cream"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Nos Offres
          </h2>
        </motion.div>

        {/* Grille des cartes — entrée en cascade */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {offres.map((offre, i) => (
            <OffreCard key={i} offre={offre} />
          ))}
        </motion.div>

        {/* Bouton bas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            to="/offres"
            className="clip-skew inline-block bg-red-sc hover:bg-red-dark text-white font-condensed font-bold text-sm tracking-widest uppercase px-10 py-4 transition-all duration-200 hover:-translate-y-0.5 no-underline"
          >
            Voir toutes nos offres
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
