import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/application', label: "L'Application" },
  { to: '/offres',      label: 'Nos Offres' },
  { to: '/blog',        label: 'Blog' },
  { to: '/contact',     label: 'Infos' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 border-b border-gray-200 backdrop-blur-md ${
        scrolled ? 'bg-white/95' : 'bg-white/90'
      }`}
    >
      {/* Logo agrandi */}
      <Link to="/" className="flex items-center gap-3 no-underline">
        <img
          src="/images/logo.avif"
          alt="Self Checks Logo"
          className="h-12 w-auto"
        />
      </Link>

      {/* Liens desktop — texte navy sur fond blanc */}
      <ul className="hidden md:flex gap-10 list-none">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `text-xs font-medium tracking-widest uppercase no-underline transition-colors duration-200 ${
                  isActive ? 'text-red-sc' : 'text-navy hover:text-red-sc'
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Bouton CTA — reste rouge */}
      <Link
        to="/contact"
        className="hidden md:inline-block clip-skew bg-red-sc hover:bg-red-dark text-white font-condensed font-bold text-sm tracking-widest uppercase px-6 py-3 transition-colors duration-200 no-underline"
      >
        Contactez-nous
      </Link>

      {/* Burger mobile — traits navy */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Menu"
      >
        <span className={`block w-6 h-0.5 bg-navy transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-0.5 bg-navy transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-navy transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Menu mobile */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 py-6 px-8 flex flex-col gap-4 md:hidden">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="text-sm font-condensed font-bold tracking-widest uppercase text-navy hover:text-red-sc transition-colors no-underline"
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