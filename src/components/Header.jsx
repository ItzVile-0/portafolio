// ─────────────────────────────────────────────────────────────────────────────
// Header.jsx  —  Barra de navegación fija (sticky)
// Se vuelve opaca al hacer scroll. Incluye menú hamburguesa para móvil
// y el selector de idioma (ES / EN).
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'
import LangSwitch from './LangSwitch'
import { useLang } from '../i18n/LanguageContext'

export default function Header() {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('#hero')
  const [menuOpen, setMenuOpen] = useState(false)

  // Enlaces de navegación — las etiquetas se traducen con t()
  const navLinks = [
    { label: t('nav.intro'),      href: '#hero'        },
    { label: t('nav.about'),      href: '#sobre-mi'    },
    { label: t('nav.experience'), href: '#experiencia' },
    { label: t('nav.projects'),   href: '#proyectos'   },
    { label: t('nav.skills'),     href: '#skills'      },
    { label: t('nav.contact'),    href: '#contacto'    },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setActive(href)
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070712]/90 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      {/* Línea decorativa inferior sutil (degradado) al hacer scroll */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.25), transparent)' }}
      />

      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ── Logo / Marca personal ── */}
        <motion.a
          href="#hero"
          onClick={(e) => handleNav(e, '#hero')}
          className="group flex items-center gap-2.5 hover:opacity-90 transition-opacity"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Logo size={34} />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-mono text-sm font-semibold text-slate-100 tracking-wide group-hover:text-cyan transition-colors">
              Camilo Cabrera
            </span>
            <span className="font-mono text-[10px] text-cyan/60 tracking-[0.15em] mt-0.5">
              {t('nav.role')}
            </span>
          </div>
        </motion.a>

        {/* ── Navegación de escritorio ── */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className={`px-3.5 py-2 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 ${
                active === link.href
                  ? 'text-cyan bg-cyan/10'
                  : 'text-slate-400 hover:text-cyan hover:bg-cyan/5'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              {link.label}
            </motion.a>
          ))}

          {/* Selector de idioma */}
          <div className="ml-2"><LangSwitch /></div>

          {/* Botón CTA principal */}
          <motion.a
            href="#contacto"
            onClick={(e) => handleNav(e, '#contacto')}
            className="ml-2 btn-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {t('nav.cta')}
          </motion.a>
        </nav>

        {/* ── Controles móvil: switch idioma + hamburguesa ── */}
        <div className="flex items-center gap-3 lg:hidden">
          <LangSwitch />
          <button
            className="text-slate-400 hover:text-cyan transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* ── Menú móvil desplegable ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0d0d1f] border-b border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNav(e, link.href)}
                  className="py-2.5 text-sm text-slate-400 hover:text-cyan transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
