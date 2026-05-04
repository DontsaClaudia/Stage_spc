import { Link } from 'react-router-dom'

const menuLinks = [
  { to: '/',            label: 'Accueil' },
  { to: '/application', label: 'Notre Application' },
  { to: '/offres',      label: 'Nos Offres' },
  { to: '/blog',        label: 'Blog' },
  { to: '/contact',     label: 'Contact' },
]

export default function Footer() {
  return (
    <>
      <footer className="bg-navy border-t border-white/6 px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* ── Brand ── */}
        <div className="md:col-span-1">
          <img
            src="/images/logo_1.png"
            alt="Self Checks"
            className="h-16 w-auto mb-4"
          />
          <p className="text-sm text-muted leading-relaxed max-w-xs">
            Application d'auto-évaluation sportive pour athlètes et coachs.
            Évaluez-vous. Défiez-vous. Dépassez-vous.
          </p>
          {/* Réseaux sociaux */}
          <div className="flex gap-3 mt-6">
            {[
              { label: 'in', href: '#' },
              { label: 'f',  href: '#' },
              { label: 'ig', href: '#' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="w-9 h-9 border border-white/10 hover:border-red-sc flex items-center justify-center text-xs text-muted hover:text-red-sc transition-all duration-200 rounded-sm no-underline"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Menu ── */}
        <div>
          <div className="font-condensed font-bold text-[0.78rem] tracking-[0.2em] uppercase text-red-sc mb-4">
            Menu
          </div>
          <ul className="flex flex-col gap-2.5 list-none">
            {menuLinks.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-muted hover:text-cream transition-colors duration-200 no-underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Contact ── */}
        <div>
          <div className="font-condensed font-bold text-[0.78rem] tracking-[0.2em] uppercase text-red-sc mb-4">
            Contact
          </div>
          <ul className="flex flex-col gap-2 list-none text-sm text-muted">
            <li>Hôtel particulier Roger Ducos</li>
            <li>12 rue Arsene Vermenouze</li>
            <li>15000 Aurillac, France</li>
            <li>
              <a
                href="mailto:stephane@palmiercosnulting.fr"
                className="hover:text-cream transition-colors no-underline"
              >
                stephane@palmiercosnulting.fr
              </a>
            </li>
            <li>
              <a
                href="tel:0681173370"
                className="hover:text-cream transition-colors no-underline"
              >
                06 81 17 33 70
              </a>
            </li>
          </ul>
        </div>

        {/* ── Essai gratuit ── */}
        <div>
          <div className="font-condensed font-bold text-[0.78rem] tracking-[0.2em] uppercase text-red-sc mb-4">
            Commencer
          </div>
          <p className="text-sm text-muted leading-relaxed mb-4">
            Essayez Self Checks gratuitement pendant 30 jours. Sans engagement.
          </p>
          <Link
            to="/offres"
            className="inline-block bg-red-sc hover:bg-red-dark text-white font-condensed font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-sm transition-all duration-200 no-underline hover:-translate-y-0.5"
          >
            🎁 Essai gratuit
          </Link>
          <div className="mt-6">
            <div className="font-condensed font-bold text-[0.78rem] tracking-[0.2em] uppercase text-red-sc mb-2">
              Horaires
            </div>
            <p className="text-sm text-muted">24h / 24 — 7j / 7</p>
          </div>
        </div>

      </footer>

      {/* ── Barre du bas ── */}
      <div className="bg-navy border-t border-white/6 px-8 py-4 flex items-center justify-between flex-wrap gap-4">
        <span className="text-[0.72rem] text-muted/40 tracking-wide">
          © 2025 Self Checks — Tous droits réservés
        </span>
        <span className="text-[0.72rem] text-muted/40 tracking-wide">
          Conçu à Aurillac
        </span>
      </div>
    </>
  )
}
