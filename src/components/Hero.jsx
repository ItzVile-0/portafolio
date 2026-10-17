// ─────────────────────────────────────────────────────────────────────────────
// Hero.jsx  —  Sección de introducción / presentación principal
// Textos traducibles vía contexto de idioma (ES/EN).
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'

// Renderiza texto con marcas simples: <b>negrita blanca</b> y <c>cian</c>
function RichText({ text }) {
  const parts = text.split(/(<b>.*?<\/b>|<c>.*?<\/c>)/g)
  return parts.map((part, i) => {
    if (part.startsWith('<b>')) return <strong key={i} className="text-white">{part.slice(3, -4)}</strong>
    if (part.startsWith('<c>')) return <strong key={i} className="text-cyan">{part.slice(3, -4)}</strong>
    return part
  })
}

// Hook typewriter
function useTypewriter(texts, speed = 75, pause = 2000) {
  const [display, setDisplay]       = useState('')
  const [idx, setIdx]               = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Si cambia el idioma (y por tanto la lista), reinicia
  useEffect(() => { setDisplay(''); setIdx(0); setIsDeleting(false) }, [texts])

  useEffect(() => {
    const current = texts[idx % texts.length]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplay(current.slice(0, display.length + 1))
        if (display.length + 1 === current.length) setTimeout(() => setIsDeleting(true), pause)
      } else {
        setDisplay(current.slice(0, display.length - 1))
        if (display.length === 0) { setIsDeleting(false); setIdx((idx + 1) % texts.length) }
      }
    }, isDeleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [display, isDeleting, idx, texts, speed, pause])

  return display
}

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }
const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  const { t } = useLang()
  const role = useTypewriter(t('hero.roles'))

  const stats = [
    { num: '4+', label: t('hero.stats.years')    },
    { num: '3',  label: t('hero.stats.sectors')  },
    { num: 'B2', label: t('hero.stats.english')  },
    { num: '∞',  label: t('hero.stats.problems') },
  ]

  return (
    <div className="relative min-h-screen flex items-center pt-24 pb-12">
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full bg-cyan/5 blur-[130px] pointer-events-none" />
      <div className="absolute left-1/4 bottom-10 w-[300px] h-[300px] rounded-full bg-violet/5 blur-[100px] pointer-events-none" />

      <div className="section-wrapper w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Columna izquierda: texto ── */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex-1 max-w-2xl">

            <motion.div variants={itemVariants} className="mb-7">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 font-mono text-xs text-cyan">
                <span className="w-2 h-2 rounded-full bg-cyan animate-pulse-glow" />
                {t('hero.available')}
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl font-semibold leading-[1.08] mb-4 text-slate-100">
              Camilo<br />
              <span className="text-cyan glow-text">Cabrera</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="font-mono text-base text-slate-500 mb-5 h-7">
              <span className="text-cyan/60">$ </span>
              <span className="text-slate-300">{role}</span>
              <span className="text-cyan animate-blink">_</span>
            </motion.p>

            <motion.p variants={itemVariants} className="text-slate-300 text-base leading-relaxed max-w-xl mb-4">
              <RichText text={t('hero.valueProp')} />
            </motion.p>

            <motion.p variants={itemVariants} className="text-slate-500 text-sm leading-relaxed max-w-xl mb-10 font-mono border-l-2 border-cyan/30 pl-4 italic whitespace-pre-line">
              {t('hero.quote')}
            </motion.p>

            <motion.div variants={itemVariants} className="flex gap-4 flex-wrap mb-14">
              <a href="#proyectos" className="btn-primary text-sm px-6 py-3">{t('hero.btnWork')}</a>
              <a href="/CV_Camilo_Cabrera.pdf" download="CV_Camilo_Cabrera.pdf" className="btn-secondary text-sm px-6 py-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t('hero.btnCV')}
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-x-10 gap-y-5 pt-8 border-t border-white/[0.06]">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-mono text-3xl font-bold text-cyan">{s.num}</div>
                  <div className="text-xs text-slate-500 mt-1 tracking-wide">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Columna derecha: foto ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="flex-shrink-0 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-[-10px] rounded-full border border-cyan/15 animate-[spin_18s_linear_infinite]" />
              <div className="absolute inset-[-22px] rounded-full border border-violet/10 animate-[spin_28s_linear_infinite_reverse]" />
              <div className="absolute inset-[-10px] rounded-full animate-[spin_18s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
              </div>
              <div className="absolute inset-[-22px] rounded-full animate-[spin_28s_linear_infinite_reverse]">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet/80" />
              </div>

              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden relative ring-2 ring-cyan/20 shadow-[0_0_60px_rgba(0,212,255,0.12)]">
                <img src="/perfil_circle.png" alt="Camilo Alejandro Cabrera González" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
              </div>

              {/* Badge: Ciberseguridad */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 bg-[#0d0d1f] border border-cyan/20 rounded-xl px-3 py-2 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛡️</span>
                  <div>
                    <div className="text-[10px] font-semibold text-slate-200 leading-none mb-0.5">{t('hero.badges.cyber')}</div>
                    <div className="text-[9px] font-mono text-cyan/70">{t('hero.badges.diploma')}</div>
                  </div>
                </div>
              </motion.div>

              {/* Badge: Sector Financiero */}
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.5 }}
                className="absolute -top-4 -left-6 bg-[#0d0d1f] border border-cyan/20 rounded-xl px-3 py-2 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏦</span>
                  <div>
                    <div className="text-[10px] font-semibold text-slate-200 leading-none mb-0.5">{t('hero.badges.financial')}</div>
                    <div className="text-[9px] font-mono text-cyan/70">{t('hero.badges.experience')}</div>
                  </div>
                </div>
              </motion.div>

              {/* Badge: Sector Académico */}
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute -bottom-14 -left-2 bg-[#0d0d1f] border border-cyan/20 rounded-xl px-3 py-2 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎓</span>
                  <div>
                    <div className="text-[10px] font-semibold text-slate-200 leading-none mb-0.5">{t('hero.badges.academic')}</div>
                    <div className="text-[9px] font-mono text-cyan/70">{t('hero.badges.years2')}</div>
                  </div>
                </div>
              </motion.div>

              {/* Badge: Full-Stack Dev (actual) */}
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.7, duration: 0.5 }}
                className="absolute top-1/2 -right-8 -translate-y-1/2 bg-[#0d0d1f] border border-cyan/25 rounded-xl px-3 py-2 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💻</span>
                  <div>
                    <div className="text-[10px] font-semibold text-slate-200 leading-none mb-0.5">{t('hero.badges.fullstack')}</div>
                    <div className="text-[9px] font-mono text-cyan/70">{t('hero.badges.current')}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
