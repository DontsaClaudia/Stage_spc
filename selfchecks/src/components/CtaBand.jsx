import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CtaBand() {
  return (
   <section className="relative min-h-[500px] py-24 px-8 overflow-hidden text-center">
  {/* ── Vidéo de fond ── */}
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

      {/* ── Filigrane texte en arrière plan ── */}
      <span className="watermark select-none">SELF CHECKS</span>

      {/* ── Contenu ── */}
      <div className="relative z-10">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'backOut' }}
          className="inline-flex items-center gap-2 bg-red-sc/20 border border-red-sc/40 rounded-full px-4 py-1.5 mb-6"
        >
          <span className="text-red-sc text-xs font-bold tracking-widest uppercase">
            🎁 Offre de bienvenue
          </span>
        </motion.div>

        {/* Titre */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, delay: 0.1, ease: 'easeOut' }}
          className="font-condensed font-black uppercase leading-none text-cream mb-4"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
        >
          Prêt à vous<br />
          <span className="text-red-sc">dépasser ?</span>
        </motion.h2>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="text-muted text-sm leading-relaxed mb-8 max-w-lg mx-auto"
        >
          Rejoignez Self Checks dès aujourd'hui et commencez votre essai gratuit.
          Aucune carte bancaire requise — 30 jours offerts, sans engagement.
        </motion.p>

        {/* Boutons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Link
            to="/offres"
            className="relative overflow-hidden bg-red-sc hover:bg-red-dark text-white font-condensed font-bold tracking-widest uppercase px-10 py-4 rounded-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-sc/50 no-underline group"
            style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            🎁 Essayer gratuitement — 30 jours offerts
          </Link>

          <Link
            to="/contact"
            className="border-2 border-white/30 hover:border-white text-white font-condensed font-bold text-sm tracking-widest uppercase px-8 py-4 rounded-sm transition-all duration-200 hover:-translate-y-0.5 no-underline"
          >
            Nous contacter
          </Link>
        </motion.div>

        {/* Note rassurante */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 text-white/30 text-xs tracking-widest uppercase"
        >
          ✓ Sans engagement &nbsp;·&nbsp; ✓ Aucun prélèvement &nbsp;·&nbsp; ✓ Accès immédiat
        </motion.p>

      </div>
    </section>
  )
}
