// ─────────────────────────────────────────────────────────────────────────────
// About.jsx  —  Sección "Sobre mí" (traducible ES/EN)
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'

// Renderiza <b>blanco</b> y <c>cian</c> dentro del texto traducido
function RichText({ text }) {
  const parts = text.split(/(<b>.*?<\/b>|<c>.*?<\/c>)/g)
  return parts.map((part, i) => {
    if (part.startsWith('<b>')) return <strong key={i} className="text-white">{part.slice(3, -4)}</strong>
    if (part.startsWith('<c>')) return <strong key={i} className="text-cyan">{part.slice(3, -4)}</strong>
    return part
  })
}

export default function About() {
  const { t } = useLang()
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const facts = [
    { icon: '🎯',  ...t('about.facts.focus')     },
    { icon: '🏥',  ...t('about.facts.sectors')   },
    { icon: '🌐',  ...t('about.facts.mode')      },
    { icon: '🗣️', ...t('about.facts.languages') },
  ]

  return (
    <div className="section-wrapper">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <p className="section-tag">{t('about.tag')}</p>
        <h2 className="section-title">{t('about.title')}</h2>
        <p className="section-sub">{t('about.subtitle')}</p>
        <div className="section-divider" />
      </motion.div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"
      >
        {/* Narrativa */}
        <div className="lg:col-span-3 space-y-4">
          <p className="text-slate-300 text-base leading-relaxed"><RichText text={t('about.p1')} /></p>
          <p className="text-slate-400 text-base leading-relaxed"><RichText text={t('about.p2')} /></p>
          <p className="text-slate-400 text-base leading-relaxed"><RichText text={t('about.p3')} /></p>
        </div>

        {/* Datos rápidos */}
        <div className="lg:col-span-2">
          <div className="card p-6 space-y-4">
            <p className="font-mono text-xs text-cyan/60 tracking-widest mb-2">{t('about.quickFacts')}</p>
            {facts.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                className="flex items-start gap-3"
              >
                <span className="text-xl shrink-0">{h.icon}</span>
                <div>
                  <p className="text-xs text-slate-500 font-mono">{h.label}</p>
                  <p className="text-sm text-slate-300 mt-0.5">{h.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
