import { useEffect } from 'react'
import Hero from '../components/Hero'
import Concept from '../components/Concept'
import OffresApercu from '../components/OffresApercu'
import CtaBand from '../components/CtaBand'

export default function Accueil() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <>
      <Hero />
      <Concept />
      <OffresApercu />
      <CtaBand />
    </>
  )
}
