import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import CtaBand from '../components/CtaBand'
import './Application.css'

// ── Étapes "Comment ça marche" ──
const steps = [
  {
    number: '01',
    title: 'Crée ton compte',
    desc: 'Inscris-toi en tant qu\'athlète ou coach en quelques secondes. Choisis ton profil et commence immédiatement.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-red-sc">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    side: 'left',
  },
  {
    number: '02',
    title: 'Évalue tes performances',
    desc: 'Après chaque entraînement ou compétition, réponds au questionnaire d\'auto-évaluation pour analyser tes sensations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-red-sc">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
    side: 'right',
  },
  {
    number: '03',
    title: 'Progresse avec méthode',
    desc: 'Fixe tes objectifs, suis ton évolution à travers les graphiques pour t\'améliorer continuellement.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-red-sc">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    side: 'left',
  },
]

// ── Vidéos Canva (placeholders) ──
const videos = [
  {
    title: 'Pourquoi s\'auto-évaluer ?',
    desc: 'Comprendre l\'importance de l\'auto-évaluation dans la progression sportive.',
    thumb: '/images/athlete1.avif',
  },
  {
    title: 'Pourquoi Self Checks ?',
    desc: 'Découvrez les avantages de l\'utilisation de Self Checks pour améliorer votre performance sportive.',
    thumb: '/images/athlete2.avif',
    src: '/images/selfchecks2.mp4',
  },
  {
    title: 'Témoignages d\'athlètes',
    desc: 'Ils aiment Self Checks et ils sont contents de partager leur expérience.',
    thumb: '/images/athlete3.avif',
  },
]

// ── Compteurs animés ──
function Counter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = Date.now()
          const end = start + duration
          const timer = setInterval(() => {
            const now = Date.now()
            const progress = Math.min((now - start) / duration, 1)
            // Easing ease-out
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (now >= end) {
              setCount(target)
              clearInterval(timer)
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  return <span ref={ref} className="counter">{count}{suffix}</span>
}

// ── Titre avec lettres animées ──
function AnimatedTitle({ text, className }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="letter"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

export default function Application() {
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  // Timeline progress
  const timelineRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && progressRef.current) {
          progressRef.current.classList.add('active')
        }
      },
      { threshold: 0.3 }
    )
    if (timelineRef.current) observer.observe(timelineRef.current)
    return () => observer.disconnect()
  }, [])

  // Steps observer
  useEffect(() => {
    const steps = document.querySelectorAll('.timeline-step')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.3 }
    )
    steps.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-8 overflow-hidden">
        {/* Fond avec image */}
        <div className="absolute inset-0 z-0">
          <video
            src="/images/starting.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center top' }}
            />
            
          <div className="absolute inset-0 bg-ink/50" />
        </div>

        {/* Contenu */}
        <div className="relative z-10 pt-24">
          <p className="font-bold text-x tracking-[0.3em] uppercase text-red-sc mb-4">
                 Découvrez
          </p>
          {/* Titre avec lettres animées */}
          <h1
            className="font-condensed font-black uppercase leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
          >
            <AnimatedTitle text="Notre" className="block text-cream" />
            <AnimatedTitle text="Application" className="block text-red-sc" />
          </h1>
          <p className="text-muted max-w-3xl mx-auto leading-relaxed text-base mb-20"
            >
            Notre application est conçue pour aider les sportifs de tous niveaux à évaluer 
            leur performance sportive en répondant à un questionnaire d'auto-évaluation 
            après chaque entraînement ou compétition. Elle permet également de répondre à 
            des questions journalières pour évaluer votre hygiène de vie, ainsi qu'un 
            questionnaire après la compétition pour connaître votre ressenti à chaud et à 
            froid. Les coachs peuvent également suivre et évaluer les performances de leurs 
            athlètes.
         </p>
        </div>
      </section>


      {/* ── COMMENT ÇA MARCHE ── */}
<section className="relative min-h-screen flex flex-col justify-center px-8 overflow-hidden" ref={timelineRef}>
         
  {/* Image de fond */}
  <div className="absolute inset-0 z-0">
    <img
      src="/images/Marc_Palmier.jpeg"
      alt="fond"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-navy/60" />
    
  </div>

  {/* Tout le contenu dans un div z-10 */}
  <div className="relative z-10">
    <div className="text-center mb-8">
      <p className="font-bold text-x tracking-[0.3em] uppercase text-red-sc mb-4">
        Simple et efficace
      </p>
      <h2
        className="font-condensed font-black uppercase leading-none text-cream"
        style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
      >
        Comment ça marche ?
      </h2>
    </div>

    {/* Timeline */}
    <div className="relative max-w-3xl mx-auto">
      <div className="timeline-line" />
      <div className="timeline-progress" ref={progressRef} />
      <div className="flex flex-col gap-8">
        {steps.map(({ number, title, desc, icon, side }, i) => (
          <div
            key={i}
            className={`timeline-step ${side === 'right' ? 'right' : ''} flex items-center gap-8 ${
              side === 'right' ? 'flex-row-reverse' : ''
            }`}
          >
            <div className={`flex-1 ${side === 'right' ? 'text-right' : 'text-left'}`}>
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="font-condensed font-black text-red-sc/70 text-5xl leading-none">
                  {number}
                </span>
                <span className="text-2xl">{icon}</span>
              </div>
              <h3 className="font-condensed font-black text-3xl uppercase text-cream mb-2">
                {title}
              </h3>
              <p className="text-muted text-base leading-relaxed max-w-xs">
                {desc}
              </p>
            </div>
            <div className="w-4 h-4 min-w-[1rem] bg-red-sc rounded-full border-4 border-navy z-10 shadow-lg shadow-red-sc/50" />
            <div className="flex-1" />
          </div>
        ))}
      </div>
    </div>
  </div>

</section>

      {/* ── VIDÉOS CANVA ── */}
      <section className="py-24 px-8 bg-ink">
        <div className="text-center mb-12">
          <p className="font-bold text-x tracking-[0.3em] uppercase text-red-sc mb-3">
            En vidéo
          </p>
          <h2
            className="font-condensed font-black uppercase leading-none text-cream"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Nos vidéos démonstratives
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {videos.map(({ title, desc, thumb, src }, i) => (
            <div key={i} className={`video-card reveal-d${i}`}>
              {/* Thumbnail */}
              <div className="relative aspect-video">
                <video
                    src={src}
                    poster={thumb}
                    controls
                    className="w-full h-full object-cover"
                />
                {/* Overlay + bouton play */}
                <div className="play-btn" onClick={(e) => {
                    const video = e.currentTarget.previousSibling
                    video.play()
                    e.currentTarget.style.display = 'none'
                  }}>
                    <div className="play-icon">
                    <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 ml-1">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    </div>
                </div>
                
              </div>
              {/* Infos */}
              <div className="bg-navy p-4">
                <h3 className="font-condensed font-bold text-lg uppercase text-cream mb-1">
                  {title}
                </h3>
                <p className="text-muted text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── VIDÉO DÉMO ── */}
        <section className="py-24 px-8 bg-navy">
        <div className="text-center mb-12">
            <p className="text-[0.72rem] tracking-[0.3em] uppercase text-red-sc mb-3">
            Démonstration complète
            </p>
            <h2
            className="font-condensed font-black uppercase leading-none text-cream"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
            Vidéo démo
            </h2>
        </div>

        <div className="max-w-4xl mx-auto rounded-xl overflow-hidden border border-white/10">
            <video
            src="/images/selfchecks2.mp4"
            controls
            className="w-full h-full object-cover"
            
            />
        </div>
        </section>

      {/* ── CTA FINAL ── */}
      <CtaBand />
    </>
  )
}