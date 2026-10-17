// ─────────────────────────────────────────────────────────────────────────────
// LanguageContext.jsx  —  Manejo global del idioma (Español / Inglés)
// Provee el idioma actual y una función t() para traducir textos.
// El idioma por defecto es Español; se recuerda la elección del usuario
// en localStorage para que persista entre visitas.
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from './translations'

const LanguageContext = createContext()

// Hook para consumir el idioma y la función de traducción desde cualquier componente
export function useLang() {
  return useContext(LanguageContext)
}

export function LanguageProvider({ children }) {
  // Idioma inicial: lo guardado por el usuario, o 'es' (español) por defecto
  const [lang, setLang] = useState('es')

  // Al montar, recupera el idioma guardado (si existe)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio-lang')
      if (saved === 'es' || saved === 'en') setLang(saved)
    } catch {
      // Si localStorage falla, se queda en español por defecto
    }
  }, [])

  // Cambia el idioma y lo persiste
  const changeLang = (newLang) => {
    setLang(newLang)
    try {
      localStorage.setItem('portfolio-lang', newLang)
    } catch {
      // Silencioso: si no se puede guardar, igual cambia en la sesión actual
    }
    // Actualiza el atributo lang del <html> para accesibilidad y SEO
    document.documentElement.lang = newLang
  }

  // t('clave.anidada') → devuelve el texto en el idioma actual.
  // Soporta claves con puntos para navegar el diccionario anidado.
  const t = (key) => {
    const parts = key.split('.')
    let value = translations[lang]
    for (const p of parts) {
      value = value?.[p]
      if (value === undefined) return key // Si no existe, devuelve la clave (ayuda a detectar faltantes)
    }
    return value
  }

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
