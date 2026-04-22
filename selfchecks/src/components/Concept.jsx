import { Link } from 'react-router-dom'

export default function Concept() {
  return (
    <section className="grid md:grid-cols-2 min-h-[500px]">

      {/* ── Colonne gauche : photo athlète ── */}
      <div className="relative overflow-hidden group min-h-[500px]">

        {/* L'image remplit toute la colonne grâce à absolute inset-0
            object-cover : recadre sans déformer
            group-hover : effet surélèvement au survol */}
        <img
          src="/images/concept2.webp"
          alt="Athlète Self Checks"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 group-hover:brightness-110"
        />

        {/* Bordure rouge à droite */}
        <div className="absolute top-0 right-0 bottom-0 w-1 bg-red-sc z-10" />
      </div>

      {/* ── Colonne droite : texte ── */}
      <div className="bg-ink flex flex-col justify-center px-12 py-16">
        <p className="text-[0.72rem] tracking-[0.3em] uppercase text-red-sc mb-4">
          Notre application
        </p>
        <h2
          className="font-condensed font-black uppercase leading-none text-cream mb-6"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 3.5rem)' }}
        >
          Faites de chaque<br />
          entraînement<br />
          <span className="text-red-sc">un succès</span>
        </h2>
        <p className="text-muted text-sm leading-relaxed mb-10 max-w-md">
          Rejoignez notre communauté de sportifs passionnés et utilisez notre
          application pour booster votre entraînement. Auto-évaluez-vous après
          chaque séance et atteignez vos objectifs plus rapidement.
        </p>
        <Link
          to="/application"
          className="clip-skew self-start bg-red-sc hover:bg-red-dark text-white font-condensed font-bold text-sm tracking-widest uppercase px-8 py-3.5 transition-all duration-200 hover:-translate-y-0.5 no-underline"
        >
          Découvrir l'application
        </Link>
      </div>

    </section>
  )
}