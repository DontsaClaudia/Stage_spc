import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Gift, Check } from 'lucide-react'
import SectionTitle from './SectionTitle'

export default function CtaBand() {
  const reduceMotion = useReducedMotion()

  const motionProps = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.6, delay, ease: 'easeOut' },
        }

  return (
    <section className="relative min-h-[500px] section-padding overflow-hidden text-center">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src="/images/selfchecks1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div className="absolute inset-0 bg-ink/40" />
      </div>

      <span className="watermark select-none">SELF CHECKS</span>

      <div className="relative z-10">
        <motion.div
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, scale: 0.85 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: true, amount: 0.5 },
                transition: { duration: 0.5, ease: 'backOut' },
              })}
          className="inline-flex items-center gap-2 bg-red-sc/20 border border-red-sc/40 rounded-full px-4 py-1.5 mb-6"
        >
          <Gift className="w-4 h-4 text-red-sc" aria-hidden />
          <span className="text-red-sc text-xs font-bold tracking-widest uppercase">
            Offre de bienvenue
          </span>
        </motion.div>

        <motion.div {...motionProps(0.1)} className="mb-4">
          <SectionTitle
            title={
              <>
                Prêt à vous
                <br />
                <span className="text-red-sc">dépasser ?</span>
              </>
            }
            titleClassName="text-title-section"
          />
        </motion.div>

        <motion.p
          {...motionProps(0.2)}
          className="text-muted text-sm leading-relaxed mb-8 max-w-lg mx-auto"
        >
          Rejoignez Self Checks dès aujourd&apos;hui et commencez votre essai gratuit.
          Une carte bancaire sera requise — 30 jours offerts, sans engagement.
        </motion.p>

        <motion.div
          {...motionProps(0.3)}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Link
            to="/offres"
            className="relative overflow-hidden bg-red-sc hover:bg-red-dark text-white font-condensed font-bold tracking-widest uppercase px-10 py-4 rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-sc/50 no-underline group text-sm sm:text-base"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            <span className="inline-flex items-center gap-2">
              <Gift className="w-4 h-4" aria-hidden />
              Essayer gratuitement
            </span>
          </Link>

          <Link
            to="/contact"
            className="border-2 border-white/30 hover:border-white text-white font-condensed font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-sm transition-all duration-200 hover:-translate-y-0.5 no-underline"
          >
            Nous contacter
          </Link>
        </motion.div>

        <motion.p
          {...motionProps(0.5)}
          className="mt-6 text-white/30 text-xs tracking-widest uppercase flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
        >
          <span className="inline-flex items-center gap-1">
            <Check className="w-3 h-3" aria-hidden /> Sans engagement
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="inline-flex items-center gap-1">
            <Check className="w-3 h-3" aria-hidden /> Aucun prélèvement
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="inline-flex items-center gap-1">
            <Check className="w-3 h-3" aria-hidden /> Accès immédiat
          </span>
        </motion.p>
      </div>
    </section>
  )
}
