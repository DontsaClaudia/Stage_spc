import { useEffect } from 'react'
import useReveal from '../hooks/useReveal'
import CtaBand from '../components/CtaBand'

// Photos des athlètes — remplace les extensions si besoin
const athletes = [
  { src: '/images/Abdellah_Riahi_edited.jpg', name: 'Abdallah Riahi', sport: 'Athlétisme' },
  { src: '/images/Elise_Meallet.jpg',         name: 'Elise Meallet',  sport: 'Sport' },
  { src: '/images/Axel_Sendral.jpg',           name: 'Axel Sendral',   sport: 'Sport' },
  { src: '/images/Raphael_Lalitte.jpeg',        name: 'Raphael Lalitte',sport: 'Echecs' },
  { src: '/images/Flavin.jpg',                 name: 'Flavin',         sport: 'Sport' },
  { src: '/images/Baptiste_Arnaud.jpeg',        name: 'Baptiste Arnaud',sport: 'Cyclisme' },
  { src: '/images/Ugo_Ladant.jpg',             name: 'Ugo Ladant',     sport: 'Course' },
  { src: '/images/maelle.jpg',                 name: 'Maelle',         sport: 'Sport' },
  { src: '/images/Kévin.jpeg',                  name: 'Kévin',          sport: 'Sport' },
  { src: '/images/Raphael_nguyen.jpeg',         name: 'Raphael Nguyen', sport: 'Cyclisme' },
]

export default function Blog() {
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center text-center px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/athlete1.avif"
            alt="fond"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/75" />
        </div>
        <div className="relative z-10 pt-24">
          <p className="font-condensed font-bold text-sm tracking-[0.3em] uppercase text-red-sc mb-4">
            Témoignages
          </p>
          <h1
            className="font-condensed font-black uppercase leading-none text-cream mb-4"
            style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}
          >
            Ils l'aiment déjà
          </h1>
          <p className="text-muted max-w-xl mx-auto text-base leading-relaxed">
            Découvrez les athlètes qui font confiance à Self Checks pour améliorer leurs performances au quotidien.
          </p>
        </div>
      </section>

      {/* ── GALERIE MASONRY ── */}
      <section className="py-20 px-8 bg-ink">
        <div
          className="max-w-6xl mx-auto"
          style={{
            columns: '3',
            columnGap: '1rem',
          }}
        >
          {athletes.map(({ src, name, sport }, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl mb-4 cursor-pointer break-inside-avoid"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Photo */}
              <img
                src={src}
                alt={name}
                className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-75"
              />

              {/* Overlay au hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

              {/* Infos au hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                {/* Ligne rouge */}
                <div className="w-8 h-0.5 bg-red-sc mb-2" />
                <h3 className="font-condensed font-black text-lg uppercase text-white">
                  {name}
                </h3>
                <p className="text-red-sc text-xs tracking-widest uppercase font-bold">
                  {sport}
                </p>
              </div>

              {/* Badge Self Checks */}
              <div className="absolute top-3 right-3 bg-red-sc/90 text-white text-[0.6rem] font-bold tracking-widest uppercase px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300">
                Self Checks
              </div>

            </div>
          ))}
        </div>
      </section>

    </>
  )
}