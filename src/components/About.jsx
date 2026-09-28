// ─────────────────────────────────────────────────────────────────────────────
// About.jsx  —  Sección "Sobre mí"
// Un párrafo humano que conecta con el visitante, más una tarjeta lateral
// con datos rápidos (highlights) que resumen el perfil de un vistazo.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Datos rápidos que se muestran en la columna lateral ────────────────────
const HIGHLIGHTS = [
  { icon: '🎯', label: 'Enfoque',      value: 'Software a medida + Infraestructura' },
  { icon: '🏥', label: 'Sectores',     value: 'Salud, Finanzas y Educación' },
  { icon: '🌐', label: 'Modalidad',    value: 'Remoto, híbrido o presencial' },
  { icon: '🗣️', label: 'Idiomas',      value: 'Español nativo · Inglés B2' },
]

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div className="section-wrapper">

      {/* Encabezado de la sección */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-tag">sobre mí</p>
        <h2 className="section-title">Más que código</h2>
        <p className="section-sub">Quién soy y cómo trabajo</p>
        <div className="section-divider" />
      </motion.div>

      {/* Grid: párrafo principal (izq) + tarjeta de highlights (der) */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"
      >

        {/* ── Columna izquierda: narrativa personal (3/5 del ancho) ── */}
        <div className="lg:col-span-3 space-y-4">
          <p className="text-slate-300 text-base leading-relaxed">
            Soy <strong className="text-white">Camilo Cabrera</strong>, Ingeniero de Sistemas con más de
            4 años combinando dos mundos que rara vez van juntos: el
            <strong className="text-cyan"> desarrollo de software</strong> y la
            <strong className="text-cyan"> administración de infraestructura</strong>. Esa mezcla me
            permite entender un problema tanto desde el código como desde el servidor donde vive.
          </p>
          <p className="text-slate-400 text-base leading-relaxed">
            He trabajado en entornos donde un error no es solo un bug: sistemas hospitalarios donde la
            precisión salva procesos críticos, y plataformas financieras donde la seguridad y el
            cumplimiento no son negociables. Ahí aprendí a construir soluciones que
            <strong className="text-slate-200"> funcionan bajo presión real</strong>, no solo en el papel.
          </p>
          <p className="text-slate-400 text-base leading-relaxed">
            Me apasiona automatizar lo repetitivo, documentar lo importante y dejar todo mejor de como lo
            encontré. Si algo puede medirse, busco optimizarlo; si puede fallar, busco blindarlo. Trabajo
            bien solo, pero disfruto más liderando y coordinando equipos técnicos hacia una meta clara.
          </p>
        </div>

        {/* ── Columna derecha: tarjeta de datos rápidos (2/5 del ancho) ── */}
        <div className="lg:col-span-2">
          <div className="card p-6 space-y-4">
            <p className="font-mono text-xs text-cyan/60 tracking-widest mb-2">datos rápidos</p>
            {HIGHLIGHTS.map((h, i) => (
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
