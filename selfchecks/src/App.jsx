import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Accueil from './pages/Accueil'
import Application from './pages/Application'
import NosOffres from './pages/NosOffres'
import Blog from './pages/Blog'
import Success from './pages/Success'

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
          <Route path="/"            element={<Accueil />} />
          <Route path="/application" element={<Application />} />
          <Route path="/offres"      element={<NosOffres />} />
          <Route path="/contact"     element={<PageTemp titre="Contact" />} />
          <Route path="/blog"        element={<Blog />} />
          <Route path="/success"     element={<Success />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}