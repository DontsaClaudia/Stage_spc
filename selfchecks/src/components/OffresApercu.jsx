import { Link } from 'react-router-dom'

// Les 4 offres en version courte pour l'aperçu
const offres = [
  {
    tag: '★ Populaire',
    name: 'Démo\nGratuite',
    price: '30 jours offerts',
    desc: 'Découvrez l\'application gratuitement pendant 30 jours.',
    featured: true,
  },
  {
    tag: 'Sportifs',
    name: 'Sportif',
    price: '15€ / an',
    desc: 'Auto-évaluation complète et suivi de vos performances.',
    featured: false,
  },
  {
    tag: 'Coachs',
    name: 'Coach',
    price: 'Dès 40€ / an',
    desc: 'Suivez et évaluez la progression de vos athlètes.',
    featured: false,
  },
  {
    tag: 'Sur mesure',
    name: 'Made by\nSelf Checks',
    price: '1€ / sportif',
    desc: 'On crée les comptes de vos sportifs pour vous.',
    featured: false,
  },
]

export default function OffresApercu() {
  return (
    <section className="py-20 px-8 bg-navy">

      {/* En-tête de section */}
      <div className="text-center mb-12">
        <p className="reveal text-[0.72rem] tracking-[0.3em] uppercase text-red-sc mb-3">
          Tarification
        </p>
        <h2
          className="reveal reveal-d1 font-condensed font-black uppercase leading-none"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
        >
          Nos Offres
        </h2>
      </div>

      {/* Grille des 4 offres */}
      <div className="max-w-5xl mx-auto grid grid-cols-4 md:grid-cols-4 gap-px bg-red-sc/10">
        {offres.map(({ tag, name, price, desc, featured }, i) => (
          <div
            key={i}
            className={`reveal reveal-d${i} flex flex-col gap-4 p-10 min-h-[300px] transition-colors duration-10000 ${
             featured ? 'bg-red-sc hover:bg-red-dark' : 'bg-ink/60 hover:bg-navy border border-white/20'
            }`}
          >
            {/* Tag */}
            <span className={`text-[0.78rem] tracking-widest uppercase font-semibold ${
              featured ? 'text-white/60' : 'text-red-sc'
            }`}>
              {tag}
            </span>

            {/* Nom de l'offre */}
            <div className="font-condensed font-black text-3xl uppercase leading-tight whitespace-pre-line">
              {name}
            </div>

            {/* Prix */}
            <div className={`font-condensed font-bold text-xl ${
              featured ? 'text-white' : 'text-red-sc'
            }`}>
              {price}
            </div>

            {/* Description courte */}
            <p className={`text-sm leading-relaxed flex-1 ${
              featured ? 'text-white/85' : 'text-muted'
            }`}>
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Bouton vers la page complète des offres */}
      <div className="text-center mt-10">
        <Link
          to="/offres"
          className="clip-skew inline-block bg-red-sc hover:bg-red-dark text-white font-condensed font-bold text-sm tracking-widest uppercase px-10 py-4 transition-all duration-200 hover:-translate-y-0.5 no-underline"
        >
          Voir toutes nos offres
        </Link>
      </div>

    </section>
  )
}