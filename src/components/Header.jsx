// ─────────────────────────────────────────────────────────────────────────────
// Header.jsx  —  Barra de navegación fija (sticky)
// Se vuelve opaca al hacer scroll. Incluye menú hamburguesa para móvil.
// Al hacer clic en un enlace, hace scroll suave a la sección correspondiente.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'

// Lista de enlaces de navegación — label es lo que se muestra, href es el id de la sección
const navLinks = [
  { label: 'Introducción', href: '#hero'        },
  { label: 'Experiencia',  href: '#experiencia' },
  { label: 'Proyectos',    href: '#proyectos'   },
  { label: 'Skills',       href: '#skills'      },
  { label: 'Contacto',     href: '#contacto'    },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)  // ¿Ha hecho scroll el usuario?
  const [active, setActive]     = useState('#hero') // Enlace activo (resaltado)
  const [menuOpen, setMenuOpen] = useState(false)   // ¿Está abierto el menú móvil?

  // Detecta si el usuario ha bajado más de 20px para cambiar el fondo del header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll) // Limpia el listener
  }, [])

  // Manejador de clic en enlaces de navegación
  // Previene el comportamiento por defecto del <a> y hace scroll suave
  const handleNav = (e, href) => {
    e.preventDefault()
    setActive(href)       // Marca el enlace como activo
    setMenuOpen(false)    // Cierra el menú móvil si estaba abierto
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      // Cambia el fondo al hacer scroll: transparente → oscuro con blur.
      // Usamos una sombra suave en lugar de un borde sólido para evitar
      // la línea blanca brillante que aparecía al desplazarse.
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070712]/90 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      {/* Línea decorativa inferior sutil — degradado que se desvanece en los bordes,
          solo visible al hacer scroll. Reemplaza el borde sólido anterior. */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.25), transparent)',
        }}
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
          {/* Logo hexagonal animado */}
          <Logo size={34} />
          {/* Nombre + rol en dos líneas */}
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-mono text-sm font-semibold text-slate-100 tracking-wide group-hover:text-cyan transition-colors">
              Camilo Cabrera
            </span>
            <span className="font-mono text-[10px] text-cyan/60 tracking-[0.15em] mt-0.5">
              INGENIERO DE SISTEMAS
            </span>
          </div>
        </motion.a>

        {/* ── Navegación de escritorio (oculta en móvil) ── */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              // Resalta el enlace activo con fondo cian tenue
              className={`px-4 py-2 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 ${
                active === link.href
                  ? 'text-cyan bg-cyan/10'          // Estilo activo
                  : 'text-slate-400 hover:text-cyan hover:bg-cyan/5' // Estilo normal
              }`}
              // Animación de entrada escalonada (cada enlace entra 80ms después del anterior)
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              {link.label}
            </motion.a>
          ))}

          {/* Botón CTA principal en la nav — destaca visualmente */}
          <motion.a
            href="#contacto"
            onClick={(e) => handleNav(e, '#contacto')}
            className="ml-3 btn-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Hablemos
          </motion.a>
        </nav>

        {/* ── Botón hamburguesa para móvil ── */}
        <button
          className="md:hidden text-slate-400 hover:text-cyan transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {/* Tres líneas que se transforman en X cuando el menú está abierto */}
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* ── Menú móvil desplegable ── */}
      {/* AnimatePresence permite que el componente se anime al salir del DOM */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}      // Empieza cerrado
            animate={{ opacity: 1, height: 'auto' }}  // Se expande al abrir
            exit={{ opacity: 0, height: 0 }}          // Se colapsa al cerrar
            className="md:hidden bg-[#0d0d1f] border-b border-white/5"
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
