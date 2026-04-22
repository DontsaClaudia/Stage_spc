import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBand from './components/StatsBand'

// Composant temporaire pour les pages pas encore créées
const PageTemp = ({ titre }) => (
  <div className="pt-32 px-8 text-center">
    <h1 className="font-condensed font-black text-6xl uppercase text-red-sc">{titre}</h1>
  </div>
)

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-ink">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* L'accueil affiche le Hero pour l'instant
              On ajoutera les autres sections (StatsBand, Concept...) ensuite */}
          <Route path="/" element={<>
              <Hero />
              <StatsBand />
            </>} />
          <Route path="/application" element={<PageTemp titre="Notre Application" />} />
          <Route path="/offres"      element={<PageTemp titre="Nos Offres" />} />
          <Route path="/contact"     element={<PageTemp titre="Contact" />} />
          <Route path="/blog"        element={<PageTemp titre="Blog" />} />
        </Routes>
      </main>
    </div>
  )
}