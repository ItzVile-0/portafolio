// ─────────────────────────────────────────────────────────────────────────────
// ScrollProgress.jsx  —  Barra de progreso de scroll + botón "volver arriba"
// La barra superior se llena (degradado cian→violeta) a medida que el usuario
// baja por la página. El botón flotante aparece tras bajar un poco y regresa
// al inicio con scroll suave.
// ─────────────────────────────────────────────────────────────────────────────

import { useScroll, useSpring, motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useLang } from '../i18n/LanguageContext'

export default function ScrollProgress() {
  const { lang } = useLang()

  // Progreso de scroll (0 → 1) suavizado con un spring para que no se sienta brusco
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  // Controla la visibilidad del botón "volver arriba"
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const label = lang === 'en' ? 'Back to top' : 'Volver arriba'

  return (
    <>
      {/* Barra de progreso fija en el borde superior (sobre el header) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 origin-left z-[60]"
        style={{
          scaleX,
          background: 'linear-gradient(to right, #00d4ff, #6c63ff)',
        }}
        aria-hidden="true"
      />

      {/* Botón flotante "volver arriba" */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            onClick={scrollToTop}
            aria-label={label}
            title={label}
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-xl
                       bg-[#0d0d1f]/90 backdrop-blur-sm border border-cyan/30
                       text-cyan flex items-center justify-center
                       hover:bg-cyan/10 hover:border-cyan/50 transition-colors
                       shadow-[0_4px_20px_rgba(0,0,0,0.4)]
                       focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
