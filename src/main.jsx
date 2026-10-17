import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* LanguageProvider envuelve toda la app para que cualquier componente
        pueda acceder al idioma actual y a la función de traducción t() */}
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
