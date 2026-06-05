import { useEffect } from 'react'
import useReveal from '../hooks/useReveal'
import CtaBand from '../components/CtaBand'
import SectionTitle from '../components/SectionTitle'
import { useTranslation } from '../i18n/useTranslation'

const athletes = [
  { src: '/images/Riahi_ABDELLAH.png', name: 'Abdallah Riahi', sportKey: 'athletics' },
  { src: '/images/Elise_MAELLET.png', name: 'Elise Meallet', sportKey: 'sport' },
  { src: '/images/Flavin_guieu.jpeg', name: 'Flavin GUIEU', sportKey: 'football' },
  { src: '/images/Baptiste_Arnaud.jpeg', name: 'Baptiste Arnaud', sportKey: 'cycling' },
  { src: '/images/Hugo_LADANT.png', name: 'Ugo Ladant', sportKey: 'running' },
  { src: '/images/maelle.jpg', name: 'Maelle', sportKey: 'sport' },
  { src: '/images/Kévin.jpeg', name: 'Kévin', sportKey: 'sport' },
  { src: '/images/Raphael_nguyen.jpeg', name: 'Raphael Nguyen', sportKey: 'cycling' },
  { src: '/images/Mathieu_Palmier.jpeg', name: 'Mathieu', sportKey: 'rugby' },
  { src: '/images/Enzo_Delagnes.jpeg', name: 'Enzo Delagnes', sportKey: 'rugby' },
]

export default function Blog() {
  const { t } = useTranslation()
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center text-center px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/athlete1.avif" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-ink/75" />
        </div>
        <div className="relative z-10 pt-24">
          <SectionTitle
            as="h1"
            size="hero"
            label={t('blog.label')}
            title={t('blog.title')}
            titleClassName="mb-4"
          />
          <p className="text-muted max-w-xl mx-auto text-base leading-relaxed">
            {t('blog.subtitle')}
          </p>
        </div>
      </section>

      <section className="section-padding bg-ink">
        <div
          className="max-w-6xl mx-auto"
          style={{ columns: '3', columnGap: '1rem' }}
        >
          {athletes.map(({ src, name, sportKey }, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl mb-4 cursor-pointer break-inside-avoid"
            >
              <img
                src={src}
                alt={name}
                className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-3 h-0.25 bg-red-sc mb-2" />
                <h3 className="font-condensed font-black text-sm uppercase text-white">{name}</h3>
                <p className="text-red-sc text-xs tracking-widest uppercase font-bold">
                  {t(`blog.sports.${sportKey}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
