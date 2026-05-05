import { useEffect } from 'react'

export default function useReveal() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.reveal')

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('visible')
              // On arrête d'observer — l'élément reste visible pour toujours
              observer.unobserve(e.target)
            }
          })
        },
        { threshold: 0.1 }
      )

      els.forEach((el) => observer.observe(el))
    }, 200)

    return () => clearTimeout(timer)
  }, [])
}