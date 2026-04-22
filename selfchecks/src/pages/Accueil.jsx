import { useEffect } from 'react'
import useReveal from '../hooks/useReveal'
import Hero from '../components/Hero'
import StatsBand from '../components/StatsBand'
import Concept from '../components/Concept'
import OffresApercu from '../components/OffresApercu'

export default function Accueil() {
  // useReveal : active les animations au scroll sur tous les éléments .reveal
  useReveal()
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Hero />
      <StatsBand />
      <Concept />
      <OffresApercu />
    </>
  )
}