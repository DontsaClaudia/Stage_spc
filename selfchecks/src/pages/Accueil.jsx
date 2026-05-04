import { useEffect } from 'react'
import useReveal from '../hooks/useReveal'
import Hero from '../components/Hero'
import Concept from '../components/Concept'
import OffresApercu from '../components/OffresApercu'

export default function Accueil() {
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Hero />
      <Concept />
      <OffresApercu />
    </>
  )
}