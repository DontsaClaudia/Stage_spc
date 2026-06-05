import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n/useTranslation'

const panels = [
  { img: '/images/athlete1.avif' },
  { img: '/images/athlete2.avif' },
  { img: '/images/athlete3.avif' },
]

function StatsGrid({ t, className = '' }) {
  const stats = [
    { ...t('hero.stats.trial'), img: '/images/sale.png' },
    { ...t('hero.stats.profiles'), img: '/images/profil.png' },
    { ...t('hero.stats.availability'), img: '/images/dispo.png' },
    { ...t('hero.stats.selfEval'), img: '/images/test.png' },
  ]

  return (
    <div className={`mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-[360px] sm:max-w-5xl ${className}`}>
      {stats.map(({ number, label, img }, i) => (
        <div
          key={i}
          className="flex items-center gap-2 sm:gap-3 bg-ink/55 backdrop-blur-sm border border-white/15 px-3 py-2 sm:px-5 sm:py-3 rounded-xl hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl hover:shadow-black/40 hover:bg-red-sc/30 hover:border-red-sc/40 transition-all duration-300 cursor-default min-w-0"
        >
          <img src={img} alt="" className="w-6 h-6 sm:w-8 sm:h-8 shrink-0" />
          <div className="flex flex-col min-w-0">
            <span className="font-condensed font-black text-white text-base sm:text-xl leading-none">
              {number}
            </span>
            <span className="text-[0.5rem] sm:text-[0.6rem] tracking-widest uppercase text-white/60 mt-0.5 leading-tight">
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  const { t } = useTranslation()

  return (
    <>
      <section className="relative h-[100vh] min-h-[100vh] grid grid-cols-3 overflow-hidden">
        {panels.map(({ img }, i) => (
          <div key={i} className="relative overflow-hidden group">
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent pointer-events-none" />
            {i < 2 && (
              <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-red-sc z-10" />
            )}
          </div>
        ))}

        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none text-center px-4 animate-fadeup">
          <h1
            className="font-condensed font-black uppercase leading-none text-title-hero"
            style={{ textShadow: '0 4px 40px rgba(0,0,0,0.85)' }}
          >
            Self
            <span className="block text-red-sc">Checks</span>
          </h1>
          <p
            className="mt-4 font-condensed font-semibold tracking-[0.25em] uppercase text-cream/80 text-sm sm:text-base"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}
          >
            <span className="text-red-sc">{t('hero.taglineHighlight')}</span>
            &nbsp;{t('hero.taglineRest')}
          </p>
        </div>

        <div className="absolute bottom-24 sm:bottom-28 inset-x-0 z-30 flex flex-wrap justify-center gap-3 sm:gap-4 animate-fadeup-slow pointer-events-auto w-full px-4">
          <Link
            to="/offres"
            className="clip-skew bg-red-sc hover:bg-red-dark text-white font-condensed font-bold text-sm tracking-widest uppercase px-6 sm:px-8 py-3.5 sm:py-4 transition-all duration-200 hover:-translate-y-0.5 no-underline whitespace-nowrap shadow-xl shadow-red-sc/30"
          >
            {t('hero.ctaTrial')}
          </Link>
          <Link
            to="/application"
            className="clip-skew bg-black/40 backdrop-blur-md border-2 border-white/70 hover:border-white text-white font-condensed font-bold text-sm tracking-widest uppercase px-6 sm:px-8 py-3.5 sm:py-4 transition-all duration-200 hover:-translate-y-0.5 no-underline whitespace-nowrap shadow-xl"
          >
            {t('hero.ctaApp')}
          </Link>
        </div>

        <div className="hidden sm:block absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 px-3 sm:px-8">
          <StatsGrid t={t} />
        </div>

        <div className="absolute bottom-8 sm:bottom-24 right-4 sm:right-8 z-20 flex flex-col items-center gap-2">
          <div className="w-px h-10 bg-gradient-to-b from-red-sc to-transparent animate-line" />
          <span
            className="text-white/30 text-[0.6rem] tracking-[0.2em] uppercase"
            style={{ writingMode: 'vertical-rl' }}
          >
            {t('hero.scroll')}
          </span>
        </div>
      </section>

      <section className="sm:hidden bg-ink border-t border-white/10 py-6 px-3">
        <StatsGrid t={t} />
      </section>
    </>
  )
}
