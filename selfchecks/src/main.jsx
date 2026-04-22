import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// ReactDOM.createRoot : crée l'application React dans la div #root de index.html
// BrowserRouter : active le système de routing (navigation entre pages)
// basename : préfixe de toutes les URLs (utile pour GitHub Pages)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* StrictMode : détecte les problèmes potentiels en développement */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)