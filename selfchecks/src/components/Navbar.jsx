import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
// Import du fichier CSS dédié à la navbar
import './Navbar.css'

// Liste des liens de navigation
// to : l'URL cible
// label : le texte affiché
const links = [
  { to: '/',            label: 'Accueil' },
  { to: '/application', label: "L'Application" },
  { to: '/offres',      label: 'Nos Offres' },
  { to: '/blog',        label: 'Blog' },
  { to: '/contact',     label: 'Infos' },
]

export default function Navbar() {
  // scrolled : devient true quand l'utilisateur scroll vers le bas
  // → ajoute une ombre à la navbar pour la détacher du contenu
  const [scrolled, setScrolled] = useState(false)

  // open : contrôle l'ouverture/fermeture du menu burger sur mobile
  const [open, setOpen] = useState(false)

  // visible : démarre à false pour déclencher l'animation d'entrée
  // → la navbar glisse depuis le haut au chargement de la page
  const [visible, setVisible] = useState(false)

  // pressed : stocke l'index du lien en cours de clic
  // → permet d'appliquer l'effet "bouton enfoncé"
  const [pressed, setPressed] = useState(null)

  useEffect(() => {
    // Légère attente avant d'afficher la navbar → animation d'entrée fluide
    setTimeout(() => setVisible(true), 100)

    // Écoute le scroll pour savoir si l'utilisateur a scrollé
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)

    // Nettoyage : on retire l'écouteur quand le composant se démonte
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fonction qui crée l'effet ripple (cercle rouge qui s'étend au clic)
  // e : l'événement mousedown qui contient la position du clic
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
    // On supprime le ripple après l'animation (500ms)
    setTimeout(() => ripple.remove(), 500)
  }

return (
  <>

    {/* Navbar sans le logo — hauteur contrôlée indépendamment */}
    <nav className={`navbar-wrap fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 transition-all duration-500
      ${scrolled ? 'py-3' : 'py-3'}
      ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
    `}>

    {/* Logo positionné indépendamment de la navbar */}
    <div className=" top-0 left-3 flex items-center justify-between px-8 transition-all duration-500">
      <Link to="/" className="flex items-center no-underline group">
        <img
          src="/images/logo_1.png"
          alt="Self Checks"
          className="w-12 h-auto transition-all duration-300 group-hover:scale-105 drop-shadow-lg"
        />
      </Link>
    </div>

      {/* Liens desktop */}
      <ul className="hidden md:flex items-center gap-2 list-none">
        {links.map(({ to, label }, i) => (
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
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Bouton CTA */}
      <Link
        to="/contact"
        className="hidden md:flex items-center gap-2 relative overflow-hidden clip-skew bg-red-sc hover:bg-red-dark text-white font-condensed font-bold text-sm tracking-widest uppercase px-6 py-3 transition-all duration-300 no-underline hover:shadow-lg hover:shadow-red-sc/40 hover:-translate-y-0.5 group"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
        Contactez-nous
      </Link>

      {/* Burger mobile */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex flex-col items-center justify-center gap-1.5 w-8 h-8"
        aria-label="Menu"
      >
        <span className={`block w-6 h-0.5 bg-white origin-center transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0 scale-x-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-white origin-center transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Menu mobile */}
      <div className={`absolute top-full left-0 right-0 bg-ink/95 border-b border-white/10 shadow-xl overflow-hidden transition-all duration-300 md:hidden
        ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="py-4 px-8 flex flex-col gap-1">
          {links.map(({ to, label }) => (
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
              {label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 clip-skew bg-red-sc text-white font-condensed font-bold text-sm tracking-widest uppercase px-6 py-3 text-center no-underline hover:bg-red-dark transition-colors"
          >
            Contactez-nous
          </Link>
        </div>
      </div>

    </nav>
  </>
)
}