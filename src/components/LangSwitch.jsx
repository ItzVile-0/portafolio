// ─────────────────────────────────────────────────────────────────────────────
// LangSwitch.jsx  —  Selector de idioma Español / Inglés
// Un toggle compacto con dos opciones (ES / EN). La opción activa se
// resalta con un fondo cian deslizante. Usa el contexto de idioma.
// ─────────────────────────────────────────────────────────────────────────────

import { useLang } from '../i18n/LanguageContext'
import { motion } from 'framer-motion'

export default function LangSwitch() {
  const { lang, changeLang } = useLang()

  return (
    <div className="relative flex items-center bg-white/[0.04] border border-white/10 rounded-lg p-0.5 font-mono text-xs">
      {/* Fondo deslizante que marca la opción activa */}
      <motion.div
        className="absolute top-0.5 bottom-0.5 w-9 rounded-md bg-cyan/15 border border-cyan/30"
        animate={{ left: lang === 'es' ? '2px' : '38px' }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
      {/* Opción Español */}
      <button
        onClick={() => changeLang('es')}
        className={`relative z-10 w-9 py-1 rounded-md transition-colors ${
          lang === 'es' ? 'text-cyan font-bold' : 'text-slate-500 hover:text-slate-300'
        }`}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
      {/* Opción Inglés */}
      <button
        onClick={() => changeLang('en')}
        className={`relative z-10 w-9 py-1 rounded-md transition-colors ${
          lang === 'en' ? 'text-cyan font-bold' : 'text-slate-500 hover:text-slate-300'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  )
}
