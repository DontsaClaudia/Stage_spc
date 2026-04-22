import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Accueil from './pages/Accueil'
import Application from './pages/Application'
import NosOffres from './pages/NosOffres'
import Contact from './pages/Contact'
import Blog from './pages/Blog'

// App est le composant racine : il contient la Navbar, le Footer,
// et le système de routing qui affiche la bonne page selon l'URL
export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-ink">
      {/* Navbar visible sur toutes les pages */}
      <Navbar />

      {/* Zone principale : change selon l'URL */}
      <main className="flex-1">
        <Routes>
          {/* Chaque Route associe une URL à un composant page */}
          <Route path="/"            element={<Accueil />} />
          <Route path="/application" element={<Application />} />
          <Route path="/offres"      element={<NosOffres />} />
          <Route path="/contact"     element={<Contact />} />
          <Route path="/blog"        element={<Blog />} />
        </Routes>
      </main>

      {/* Footer visible sur toutes les pages */}
      <Footer />
    </div>
  )
}