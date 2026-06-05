import { Link } from 'react-router-dom'
import { Gift } from 'lucide-react'
import { useTranslation } from '../i18n/useTranslation'

export default function Footer() {
  const { t } = useTranslation()

  const menuLinks = [
    { to: '/', key: 'nav.home' },
    { to: '/application', key: 'footer.ourApplication' },
    { to: '/offres', key: 'nav.offers' },
    { to: '/temoignages', key: 'nav.testimonials' },
    { to: '/contact', key: 'nav.contact' },
  ]

  return (
    <>
      <footer className="bg-navy border-t border-white/6 px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <img src="/images/logo_1.png" alt="Self Checks" className="h-16 w-auto mb-4" />
          <p className="text-sm text-muted leading-relaxed max-w-xs">{t('footer.description')}</p>
          <div className="flex gap-3 mt-6">
            {[
              { label: 'in', href: 'https://www.linkedin.com/company/self-checks/' },
              { label: 'f', href: 'https://www.facebook.com/people/Self-checks/100092513882627/' },
              { label: 'ig', href: 'https://www.instagram.com/self_checks?igshid=MWQ2ODkyMjM%3D' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/10 hover:border-red-sc flex items-center justify-center text-xs text-muted hover:text-red-sc transition-all duration-200 rounded-sm no-underline"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="font-condensed font-bold text-[0.78rem] tracking-[0.2em] uppercase text-red-sc mb-4">
            {t('footer.menu')}
          </div>
          <ul className="flex flex-col gap-2.5 list-none">
            {menuLinks.map(({ to, key }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-muted hover:text-cream transition-colors duration-200 no-underline"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-condensed font-bold text-[0.78rem] tracking-[0.2em] uppercase text-red-sc mb-4">
            {t('footer.contact')}
          </div>
          <ul className="flex flex-col gap-2 list-none text-sm text-muted">
            <li>Hôtel particulier Roger Ducos</li>
            <li>12 rue Arsene Vermenouze</li>
            <li>15000 Aurillac, France</li>
            <li>
              <a href="mailto:stephane@palmierconsulting.fr" className="hover:text-cream transition-colors no-underline">
                stephane@palmierconsulting.fr
              </a>
            </li>
            <li>
              <a href="tel:0681173370" className="hover:text-cream transition-colors no-underline">
                06 81 17 33 70
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-condensed font-bold text-[0.78rem] tracking-[0.2em] uppercase text-red-sc mb-4">
            {t('footer.start')}
          </div>
          <p className="text-sm text-muted leading-relaxed mb-4">{t('footer.trialText')}</p>
          <Link
            to="/offres"
            className="inline-flex items-center gap-2 bg-red-sc hover:bg-red-dark text-white font-condensed font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-sm transition-all duration-200 no-underline hover:-translate-y-0.5"
          >
            <Gift className="w-4 h-4" aria-hidden />
            {t('footer.trialCta')}
          </Link>
          <div className="mt-6">
            <div className="font-condensed font-bold text-[0.78rem] tracking-[0.2em] uppercase text-red-sc mb-2">
              {t('footer.hours')}
            </div>
            <p className="text-sm text-muted">{t('footer.hoursValue')}</p>
          </div>
        </div>
      </footer>

      <div className="bg-navy border-t border-white/6 px-8 py-4 flex items-center justify-between flex-wrap gap-4">
        <span className="text-[0.72rem] text-muted/40 tracking-wide">{t('footer.copyright')}</span>
        <span className="text-[0.72rem] text-muted/40 tracking-wide">{t('footer.madeIn')}</span>
        <Link
          to="/resiliation"
          className="inline-block bg-red-sc hover:bg-red-dark text-white font-condensed font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-sm transition-all duration-200 no-underline hover:-translate-y-0.5"
        >
          {t('footer.manageSubscription')}
        </Link>
      </div>
    </>
  )
}
