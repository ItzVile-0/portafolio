// ─────────────────────────────────────────────────────────────────────────────
// Contact.jsx  —  Sección de contacto
// Muestra enlaces directos (email, WhatsApp, LinkedIn) y un formulario
// que abre el cliente de correo del usuario con los datos prellenados.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Lista de enlaces de contacto ───────────────────────────────────────────
// Cada objeto tiene: ícono SVG, etiqueta, valor visible y URL de destino
const CONTACT_LINKS = [
  {
    // Ícono de sobre de correo (SVG inline)
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'camiloalejo29@hotmail.es',
    href:  'mailto:camiloalejo29@hotmail.es', // Abre cliente de correo
  },
  {
    // Ícono de teléfono (SVG inline)
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'WhatsApp / Teléfono',
    value: '+57 302 676 2269',
    href:  'https://wa.me/573026762269', // Abre chat de WhatsApp directamente
  },
  {
    // Ícono de LinkedIn (SVG inline con el logo oficial de la red)
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    label: 'LinkedIn',
    value: 'linkedin.com/in/alejandro-gonzález-95464533b',
    href:  'https://www.linkedin.com/in/alejandro-gonzález-95464533b',
  },
]

// ── Componente principal ───────────────────────────────────────────────────
export default function Contact() {
  // Estado del formulario — un objeto con los tres campos
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  // Estado del envío: null = inicial, 'sending' = enviando, 'sent' = enviado
  const [status, setStatus] = useState(null)

  // useRef + useInView: detecta cuando la sección entra en el viewport
  // para disparar la animación de entrada (once: true → solo la primera vez)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Actualiza el campo correspondiente en el estado cuando el usuario escribe
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  // Manejador del envío del formulario
  // Construye un enlace mailto con los datos y lo abre en el cliente de correo
  const handleSubmit = (e) => {
    e.preventDefault() // Evita la recarga de página por defecto
    if (!form.name || !form.email || !form.message) return // Validación básica

    // Crea el asunto y cuerpo del email con los datos del formulario
    const subject = `Oportunidad para Camilo – ${form.name}`
    const body    = `Hola Camilo,\n\nNombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}`

    // Abre el cliente de correo con los datos prellenados
    window.open(
      `mailto:camiloalejo29@hotmail.es?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    )

    setStatus('sent')                              // Cambia el estado a "enviado"
    setForm({ name: '', email: '', message: '' })  // Limpia el formulario
    setTimeout(() => setStatus(null), 4000)        // Resetea el estado tras 4s
  }

  return (
    <div className="section-wrapper">

      {/* ── Encabezado de la sección ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-tag">contacto</p>
        <h2 className="section-title">¿Hablamos?</h2>
        <p className="section-sub">Tengo disponibilidad inmediata — respondo en menos de 24 horas</p>
        <div className="section-divider" />
      </motion.div>

      {/* ── Banner de CTA — texto que invita a contactar ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 p-6 rounded-xl border border-cyan/20 bg-cyan/5"
      >
        <p className="text-slate-300 text-base leading-relaxed">
          Si buscas un profesional que{' '}
          <strong className="text-cyan">entienda tanto el negocio como la tecnología</strong> —
          alguien que haya resuelto problemas reales en entornos críticos de salud y finanzas —
          tienes mi atención completa. Cuéntame tu desafío.
        </p>
      </motion.div>

      {/* ── Grid: columna de links + columna de formulario ── */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
      >

        {/* ════════════════════════════
            COLUMNA IZQUIERDA — Links
        ════════════════════════════ */}
        <div className="space-y-3">

          {/* Itera sobre los enlaces de contacto y renderiza una tarjeta por cada uno */}
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              // Los mailto no necesitan target="_blank", los externos sí
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer" // Seguridad: evita que la nueva pestaña acceda al origen
              className="flex items-center gap-4 p-4 card hover:border-cyan/30 hover:bg-cyan/5 group transition-all duration-200 block"
            >
              {/* Ícono con fondo cian tenue */}
              <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center text-cyan group-hover:bg-cyan/20 transition-colors shrink-0">
                {link.icon}
              </div>
              {/* Texto: etiqueta arriba, valor abajo */}
              <div>
                <div className="text-sm font-semibold text-slate-300 group-hover:text-cyan transition-colors">
                  {link.label}
                </div>
                <div className="text-sm text-slate-500 mt-0.5 font-mono">{link.value}</div>
              </div>
              {/* Flecha de navegación — indica que es un enlace */}
              <svg className="w-4 h-4 text-slate-700 group-hover:text-cyan ml-auto transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}

          {/* ── Panel de disponibilidad ── */}
          <div className="p-5 rounded-xl bg-violet/5 border border-violet/15 mt-4">
            <p className="font-mono text-xs text-violet/60 tracking-widest mb-3">disponible para</p>
            <div className="space-y-2">
              {/* Lista de tipos de oportunidades */}
              {[
                'Freelance / Proyectos a medida',
                'Oportunidades de tiempo completo',
                'Proyectos remotos e híbridos',
                'Consultoría de infraestructura TIC',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  {/* Punto cian como viñeta */}
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan shrink-0" />
                  <p className="text-sm text-slate-400">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════
            COLUMNA DERECHA — Formulario
        ══════════════════════════════════ */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Campo: nombre */}
          <div>
            <label className="form-label">Tu nombre</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="¿Con quién tengo el gusto?"
              required
              className="form-input"
            />
          </div>

          {/* Campo: email de respuesta */}
          <div>
            <label className="form-label">Tu email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Para responderte personalmente"
              required
              className="form-input"
            />
          </div>

          {/* Campo: mensaje / descripción del proyecto */}
          <div>
            <label className="form-label">¿Cuál es el reto?</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder="Cuéntame el problema que quieres resolver. Sin compromisos — si puedo ayudarte, te lo digo directamente."
              required
              className="form-input resize-none" // resize-none: evita que el usuario redimensione el textarea
            />
          </div>

          {/* Botón de envío — cambia texto según el estado */}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full btn-primary py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'sent' ? '✓ Enviado — te respondo pronto' : 'Enviar mensaje →'}
          </button>

          {/* Mensaje de confirmación — aparece 1s después del envío */}
          {status === 'sent' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-cyan font-mono"
            >
              ¡Genial! Revisa tu cliente de correo para completar el envío.
            </motion.p>
          )}
        </form>
      </motion.div>
    </div>
  )
}
