import { useEffect } from 'react'

// Ce hook observe les éléments avec la classe "reveal"
// Quand ils entrent dans le champ de vision (scroll),
// il leur ajoute la classe "visible" → l'animation CSS se déclenche
export default function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible') // déclenche l'animation
            observer.unobserve(e.target)      // on arrête d'observer une fois visible
          }
        })
      },
      { threshold: 0.12 } // l'élément doit être visible à 12% pour se déclencher
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect() // nettoyage quand le composant se démonte
  }, [])
}