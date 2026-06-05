import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useTranslation } from '../i18n/useTranslation'
import LanguageSwitcher from './LanguageSwitcher'
import './Navbar.css'

export default function Navbar() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(null)

  const links = [
    { to: '/', key: 'nav.home' },
    { to: '/application', key: 'nav.application' },
    { to: '/offres', key: 'nav.offers' },
    { to: '/temoignages', key: 'nav.testimonials' },
    { to: '/contact', key: 'nav.contact' },
  ]

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleRipple = (e) => {
    const btn = e.currentTarget
    const ripple = document.createElement('span')
    const size = Math.max(btn.offsetWidth, btn.offsetHeight)
    const rect = btn.getBoundingClientRect()

    ripple.className = 'ripple'
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
    `
    btn.appendChild(ripple)
    setTimeout(() => ripple.remove(), 500)
  }

  return (
    <nav
      className={`navbar-wrap fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-8 transition-all duration-500
      ${scrolled ? 'scrolled' : ''}
      ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
    `}
    >
      <div className="flex items-center">
        <Link to="/" className="flex items-center no-underline group">
          <img
            src="/images/logo_1.png"
            alt="Self Checks"
            className="w-10 sm:w-12 h-auto transition-all duration-300 group-hover:scale-105 drop-shadow-lg"
          />
        </Link>
      </div>

      <ul className="hidden lg:flex items-center gap-1 list-none">
        {links.map(({ to, key }, i) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `nav-btn ${isActive ? 'active-link' : ''} ${pressed === i ? 'pressed' : ''}`
              }
              onMouseDown={(e) => {
                setPressed(i)
                handleRipple(e)
              }}
              onMouseUp={() => setPressed(null)}
              onMouseLeave={() => setPressed(null)}
            >
              {t(key)}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="hidden md:flex items-center gap-3">
        <LanguageSwitcher />
        <Link
          to="/contact"
          className="items-center gap-2 relative overflow-hidden clip-skew bg-red-sc hover:bg-red-dark text-white font-condensed font-bold text-sm tracking-widest uppercase px-5 py-3 transition-all duration-300 no-underline hover:shadow-lg hover:shadow-red-sc/40 hover:-translate-y-0.5 group inline-flex"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          {t('nav.contactUs')}
        </Link>
      </div>

      <div className="flex md:hidden items-center gap-3">
        <LanguageSwitcher />
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col items-center justify-center gap-1.5 w-8 h-8"
          aria-label={t('nav.menu')}
        >
          <span className={`block w-6 h-0.5 bg-white origin-center transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white origin-center transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <div
        className={`absolute top-full left-0 right-0 bg-ink/95 border-b border-white/10 shadow-xl overflow-hidden transition-all duration-300 lg:hidden
        ${open ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'}
      `}
      >
        <div className="py-4 px-8 flex flex-col gap-1">
          {links.map(({ to, key }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-3 px-4 text-sm font-condensed font-bold tracking-widest uppercase transition-all duration-200 no-underline rounded
                ${isActive ? 'text-white bg-red-sc' : 'text-white/70 hover:text-white hover:bg-white/10'}`
              }
            >
              {t(key)}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 clip-skew bg-red-sc text-white font-condensed font-bold text-sm tracking-widest uppercase px-6 py-3 text-center no-underline hover:bg-red-dark transition-colors"
          >
            {t('nav.contactUs')}
          </Link>
        </div>
      </div>
    </nav>
  )
}
