import { Link } from 'react-router-dom'
import './OffresApercu.css'

const offres = [
  {
    tag: '★ Populaire',
    name: 'Démo\nGratuite',
    price: '30 jours offerts',
    desc: 'Découvrez l\'application gratuitement pendant 30 jours.',
    icon: '🎁',
    featured: true,
  },
  {
    tag: 'Sportifs',
    name: 'Sportif',
    price: '15€ / an',
    desc: 'Auto-évaluation complète et suivi de vos performances.',
    icon: '🏃',
    featured: false,
  },
  {
    tag: 'Coachs',
    name: 'Coach',
    price: 'Dès 40€ / an',
    desc: 'Suivez et évaluez la progression de vos athlètes.',
    icon: '📋',
    featured: false,
  },
  {
    tag: 'Sur mesure',
    name: 'Made by\nSelf Checks',
    price: '1€ / sportif',
    desc: 'On crée les comptes de vos sportifs pour vous.',
    icon: '⚡',
    featured: false,
  },
]

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
        {/* Overlay navy semi-transparent */}
        <div className="absolute inset-0 bg-navy/60" />
      </div>

      {/* ── Contenu ── */}
      <div className="relative z-10">

        {/* En-tête */}
        <div className="text-center mb-12">
          <p className="reveal text-[0.72rem] tracking-[0.3em] uppercase text-red-sc mb-3">
            Tarification
          </p>
          <h2
            className="reveal reveal-d1 font-condensed font-black uppercase leading-none text-cream"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Nos Offres
          </h2>
        </div>

        {/* Grille des cartes */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {offres.map(({ tag, name, price, desc, icon, featured }, i) => (
            <div
              key={i}
              className={`offre-card reveal reveal-d${i} ${featured ? 'featured' : ''}`}
            >
            

              {/* Tag */}
              <span className={`text-xs tracking-widest uppercase font-semibold ${
                featured ? 'text-white/70' : 'text-red-sc'
              }`}>
                {tag}
              </span>

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

            </div>
          ))}
        </div>

        {/* Bouton voir toutes les offres */}
        <div className="text-center mt-10">
          <Link
            to="/offres"
            className="clip-skew inline-block bg-red-sc hover:bg-red-dark text-white font-condensed font-bold text-sm tracking-widest uppercase px-10 py-4 transition-all duration-200 hover:-translate-y-0.5 no-underline"
          >
            Voir toutes nos offres
          </Link>
        </div>

      </div>
    </section>
  )
}