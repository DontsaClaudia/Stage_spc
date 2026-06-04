import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Accueil from './pages/Accueil'
import Application from './pages/Application'
import NosOffres from './pages/NosOffres'
import Blog from './pages/Blog'
import Success from './pages/Success'
import Resiliation from './pages/Resiliation'
import Contact from './pages/Contact'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-ink">
      <Navbar />
      <main className="flex-1">
        <ScrollToTop />
        <Routes>
          <Route path="/"            element={<Accueil />} />
          <Route path="/application" element={<Application />} />
          <Route path="/offres"      element={<NosOffres />} />
          <Route path="/contact"     element={<Contact />} />
          <Route path="/temoignages" element={<Blog />} />
          <Route path="/blog"        element={<Navigate to="/temoignages" replace />} />
          <Route path="/success"     element={<Success />} />
          <Route path="/resiliation" element={<Resiliation />} />
          
         
        </Routes>
      </main>
      <Footer />
    </div>
  )
}