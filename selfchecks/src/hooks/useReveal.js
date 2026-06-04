import { useEffect } from 'react'
import { getPrefersReducedMotion } from './usePrefersReducedMotion'

export default function useReveal() {
  useEffect(() => {
    const showAll = () => {
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('visible')
      })
    }

    if (getPrefersReducedMotion()) {
      showAll()
      return
    }

    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.reveal')

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('visible')
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
