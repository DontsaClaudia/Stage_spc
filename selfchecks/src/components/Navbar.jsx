import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

// Liste des liens de navigation
const links = [
  { to: '/application', label: "L'Application" },
  { to: '/offres',      label: 'Nos Offres' },
  { to: '/blog',        label: 'Blog' },
  { to: '/contact',     label: 'Infos' },
]

export default function Navbar() {
  // scrolled : true si l'utilisateur a scrollé → on rend la navbar plus opaque
  const [scrolled, setScrolled] = useState(false)
  // open : contrôle l'ouverture du menu burger sur mobile
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 border-b border-red-sc/10 backdrop-blur-md ${
        scrolled ? 'bg-ink/95' : 'bg-ink/80'
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 no-underline">
        <div className="w-11 h-11 rounded-lg bg-red-sc flex items-center justify-center font-condensed font-black text-sm text-white leading-none text-center">
          SC
        </div>
        <span className="font-condensed font-bold text-lg tracking-widest text-cream uppercase leading-tight">
          Self<br />Checks
        </span>
      </Link>

      {/* Liens desktop */}
      <ul className="hidden md:flex gap-10 list-none">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `text-xs font-medium tracking-widest uppercase no-underline transition-colors duration-200 ${
                  isActive ? 'text-red-sc' : 'text-muted hover:text-cream'
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Bouton CTA */}
      <Link
        to="/contact"
        className="hidden md:inline-block clip-skew bg-red-sc hover:bg-red-dark text-white font-condensed font-bold text-sm tracking-widest uppercase px-6 py-3 transition-colors duration-200 no-underline"
      >
        Contactez-nous
      </Link>

      {/* Burger mobile */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Menu"
      >
        <span className={`block w-6 h-0.5 bg-cream transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-0.5 bg-cream transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-cream transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Menu mobile déroulant */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-ink/97 backdrop-blur-md border-b border-red-sc/20 py-6 px-8 flex flex-col gap-4 md:hidden">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="text-sm font-condensed font-bold tracking-widest uppercase text-muted hover:text-red-sc transition-colors no-underline"
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 clip-skew bg-red-sc text-white font-condensed font-bold text-sm tracking-widest uppercase px-6 py-3 text-center no-underline"
          >
            Contactez-nous
          </Link>
        </div>
      )}
    </nav>
  )
}