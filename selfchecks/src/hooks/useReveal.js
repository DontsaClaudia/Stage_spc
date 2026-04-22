import { useEffect } from 'react'

export default function useReveal() {
  useEffect(() => {
    // Petit délai pour laisser le DOM se charger complètement
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.reveal')

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('visible')
              // On ne fait plus unobserve — l'élément reste toujours visible
            }
          })
        },
        { threshold: 0.05 } // réduit à 5% pour déclencher plus facilement
      )

      els.forEach((el) => observer.observe(el))
    }, 100)

    return () => clearTimeout(timer)
  }, [])
}