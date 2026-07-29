// ─────────────────────────────────────────────────────────────────────────────
// Hero.jsx  —  Sección de introducción / presentación principal
// Contiene: nombre, efecto typewriter, propuesta de valor, foto circular
// con anillos orbitales, badges flotantes de sector y estadísticas.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Lista de roles que rotan en el efecto de escritura (typewriter)
const ROLES = [
  'Ingeniero de Sistemas',
  'Especialista en Ciberseguridad',
  'Automatizador de Procesos',
  'Desarrollador de Software',
  'Administrador de Infraestructura',
]

// ── Hook personalizado: efecto de escritura ────────────────────────────────
// Recibe un arreglo de textos y simula que alguien los escribe y borra
// speed     → velocidad de escritura en ms por carácter
// pause     → tiempo de espera antes de empezar a borrar
function useTypewriter(texts, speed = 75, pause = 2000) {
  const [display, setDisplay]       = useState('')      // Texto visible en pantalla
  const [idx, setIdx]               = useState(0)       // Índice del texto activo
  const [isDeleting, setIsDeleting] = useState(false)   // ¿Está borrando o escribiendo?

  useEffect(() => {
    const current = texts[idx]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Modo escritura: agrega un carácter más
        setDisplay(current.slice(0, display.length + 1))
        // Si terminó de escribir, activa el modo borrado después de 'pause' ms
        if (display.length + 1 === current.length)
          setTimeout(() => setIsDeleting(true), pause)
      } else {
        // Modo borrado: quita un carácter
        setDisplay(current.slice(0, display.length - 1))
        // Si borró todo, pasa al siguiente texto
        if (display.length === 0) {
          setIsDeleting(false)
          setIdx((idx + 1) % texts.length)
        }
      }
    }, isDeleting ? speed / 2 : speed) // Borrar es el doble de rápido
    return () => clearTimeout(timeout) // Limpia el timer al re-renderizar
  }, [display, isDeleting, idx, texts, speed, pause])

  return display
}

// ── Variantes de animación para Framer Motion ──────────────────────────────
// containerVariants: el contenedor padre orquesta la entrada de sus hijos
const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.14 } }, // Hijos entran con 140ms de diferencia
}
// itemVariants: cada elemento hijo sube desde abajo con fade
const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

// ── Estadísticas que aparecen al pie del Hero ──────────────────────────────
const stats = [
  { num: '4+', label: 'Años de experiencia'                    },
  { num: '3',  label: 'Sectores: salud, educación, finanzas'   },
  { num: 'B2', label: 'Inglés certificado'                     },
  { num: '∞',  label: 'Problemas resueltos'                    },
]

// ── Componente principal ───────────────────────────────────────────────────
export default function Hero() {
  const role = useTypewriter(ROLES) // Texto animado del rol actual

  return (
    // Contenedor principal: ocupa toda la pantalla y centra verticalmente
    <div className="relative min-h-screen flex items-center pt-24 pb-12">

      {/* Orb decorativo cian — esquina superior derecha */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full bg-cyan/5 blur-[130px] pointer-events-none" />
      {/* Orb decorativo violeta — esquina inferior izquierda */}
      <div className="absolute left-1/4 bottom-10 w-[300px] h-[300px] rounded-full bg-violet/5 blur-[100px] pointer-events-none" />

      {/* Wrapper centrado con padding estándar de sección */}
      <div className="section-wrapper w-full">

        {/* Grid de dos columnas: texto a la izq, foto a la der (se apilan en móvil) */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">

          {/* ══════════════════════════════════════════════
              COLUMNA IZQUIERDA — Texto e información
          ══════════════════════════════════════════════ */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 max-w-2xl"
          >
            {/* Badge de disponibilidad — indica que está abierto a oportunidades */}
            <motion.div variants={itemVariants} className="mb-7">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan/10 border border-cyan/20 font-mono text-xs text-cyan">
                {/* Punto pulsante animado que simula un indicador "en vivo" */}
                <span className="w-2 h-2 rounded-full bg-cyan animate-pulse-glow" />
                Disponible · Cali, Colombia
              </span>
            </motion.div>

            {/* Nombre — el texto más grande y visible de toda la página */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-semibold leading-[1.08] mb-4 text-slate-100"
            >
              Camilo<br />
              {/* Apellido en cian con efecto de luz (glow-text definido en index.css) */}
              <span className="text-cyan glow-text">Cabrera</span>
            </motion.h1>

            {/* Rol animado con efecto typewriter */}
            <motion.p variants={itemVariants} className="font-mono text-base text-slate-500 mb-5 h-7">
              <span className="text-cyan/60">$ </span>           {/* Símbolo de terminal */}
              <span className="text-slate-300">{role}</span>     {/* Texto que cambia */}
              <span className="text-cyan animate-blink">_</span> {/* Cursor parpadeante */}
            </motion.p>

            {/* Propuesta de valor — el "gancho" que genera curiosidad en el reclutador */}
            <motion.p variants={itemVariants} className="text-slate-300 text-base leading-relaxed max-w-xl mb-4">
              Soy el ingeniero que{' '}
              <strong className="text-white">digitalizó procesos críticos</strong> en
              un hospital colombiano — donde un error cuesta vidas, no solo dinero.
              Desarrollo software a medida, blindado con ciberseguridad, que realmente{' '}
              <strong className="text-white">elimina cuellos de botella</strong> operativos.
            </motion.p>

            {/* Cita de filosofía personal — humaniza el perfil técnico */}
            <motion.p
              variants={itemVariants}
              className="text-slate-500 text-sm leading-relaxed max-w-xl mb-10 font-mono border-l-2 border-cyan/30 pl-4 italic"
            >
              "Si puede medirse, puede optimizarse.<br />Si puede automatizarse, debería estarlo."
            </motion.p>

            {/* Botones de llamada a la acción (CTA) */}
            <motion.div variants={itemVariants} className="flex gap-4 flex-wrap mb-14">
              {/* Botón primario — lleva a la sección de proyectos */}
              <a href="#proyectos" className="btn-primary text-sm px-6 py-3">Ver mi trabajo →</a>
              {/* Botón secundario — abre cliente de correo directamente */}
              <a href="mailto:camiloalejo29@hotmail.es" className="btn-secondary text-sm px-6 py-3">Hablemos ahora</a>
            </motion.div>

            {/* Estadísticas — métricas que resumen la carrera de Camilo */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-x-10 gap-y-5 pt-8 border-t border-white/[0.06]"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  {/* Número grande en cian */}
                  <div className="font-mono text-3xl font-bold text-cyan">{s.num}</div>
                  {/* Etiqueta descriptiva pequeña */}
                  <div className="text-xs text-slate-500 mt-1 tracking-wide">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ══════════════════════════════════════════════
              COLUMNA DERECHA — Foto circular con efectos
          ══════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="flex-shrink-0 flex justify-center"
          >
            {/* Contenedor relativo para posicionar los badges flotantes */}
            <div className="relative">

              {/* Anillo orbital interior — gira en sentido horario cada 18s */}
              <div className="absolute inset-[-10px] rounded-full border border-cyan/15 animate-[spin_18s_linear_infinite]" />
              {/* Anillo orbital exterior — gira en sentido contrario cada 28s */}
              <div className="absolute inset-[-22px] rounded-full border border-violet/10 animate-[spin_28s_linear_infinite_reverse]" />

              {/* Punto luminoso que orbita sobre el anillo interior */}
              <div className="absolute inset-[-10px] rounded-full animate-[spin_18s_linear_infinite]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan shadow-[0_0_8px_rgba(0,212,255,0.8)]" />
              </div>
              {/* Punto violeta que orbita sobre el anillo exterior */}
              <div className="absolute inset-[-22px] rounded-full animate-[spin_28s_linear_infinite_reverse]">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet/80" />
              </div>

              {/* ── Foto de perfil circular ── */}
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden relative
                              ring-2 ring-cyan/20 shadow-[0_0_60px_rgba(0,212,255,0.12)]">
                <img
                  src="/perfil_circle.png"
                  alt="Camilo Alejandro Cabrera González"
                  // En blanco/negro por defecto; al hover muestra color completo
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                {/* Borde interior sutil sobre la foto */}
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
              </div>

              {/* ── Badge flotante: Ciberseguridad ── (esquina inferior derecha) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 bg-[#0d0d1f] border border-cyan/20 rounded-xl px-3 py-2 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🛡️</span>
                  <div>
                    <div className="text-[10px] font-semibold text-slate-200 leading-none mb-0.5">Ciberseguridad</div>
                    <div className="text-[9px] font-mono text-cyan/70">Diplomado 2025</div>
                  </div>
                </div>
              </motion.div>

              {/* ── Badge flotante: Sector Financiero ── (esquina superior izquierda) */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="absolute -top-4 -left-6 bg-[#0d0d1f] border border-cyan/20 rounded-xl px-3 py-2 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏦</span>
                  <div>
                    <div className="text-[10px] font-semibold text-slate-200 leading-none mb-0.5">Sector Financiero</div>
                    {/* Color y fuente idénticos a todos los demás badges */}
                    <div className="text-[9px] font-mono text-cyan/70">Experiencia</div>
                  </div>
                </div>
              </motion.div>

              {/* ── Badge flotante: Sector Académico ── (parte inferior izquierda) */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute -bottom-14 -left-2 bg-[#0d0d1f] border border-cyan/20 rounded-xl px-3 py-2 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎓</span>
                  <div>
                    <div className="text-[10px] font-semibold text-slate-200 leading-none mb-0.5">Sector Académico</div>
                    <div className="text-[9px] font-mono text-cyan/70">2+ años</div>
                  </div>
                </div>
              </motion.div>

              {/* ── Badge flotante: Sector Salud (actual) ── (lado derecho, centrado) */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7, duration: 0.5 }}
                className="absolute top-1/2 -right-8 -translate-y-1/2 bg-[#0d0d1f] border border-cyan/25 rounded-xl px-3 py-2 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏥</span>
                  <div>
                    <div className="text-[10px] font-semibold text-slate-200 leading-none mb-0.5">Sector Salud</div>
                    <div className="text-[9px] font-mono text-cyan/70">Actualidad</div>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
          {/* Fin columna derecha */}

        </div>
      </div>
    </div>
  )
}
