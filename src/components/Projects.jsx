// ─────────────────────────────────────────────────────────────────────────────
// Projects.jsx  —  Galería de proyectos profesionales
// Muestra tarjetas con descripción, tecnologías usadas e impacto generado.
// Las tarjetas tienen un borde superior animado al hover y un badge "Destacado"
// en los proyectos más relevantes.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Datos de proyectos ────────────────────────────────────────────────────
// Cada objeto representa un proyecto con su metainformación
const PROJECTS = [
  {
    id: 0, emoji: '🛒',
    title: 'EroselleShop — E-commerce',
    desc:  'Tienda online completa que desarrollé de extremo a extremo, hoy en línea y 100% funcional recibiendo pagos reales. Incluye catálogo de productos, carrito de compras, pasarela de pagos y experiencia de usuario cuidada. Me encargué tanto del frontend como del backend, cubriendo todo el ciclo hasta el despliegue.',
    tags:     ['Fullstack', 'E-commerce', 'Pasarela de Pagos', 'Despliegue Web'],
    accent:   '#6c63ff',
    featured: true,
    impact:   'Tienda en vivo recibiendo pagos',
    link:     'https://eroselleshop.com',  // Enlace público al sitio en vivo
  },
  {
    id: 1, emoji: '🏥',
    title: 'Sistema de Automatización Hospitalaria',
    desc:  'Aplicaciones internas diseñadas para el Hospital San Juan de Dios de Cali. Automaticé flujos de trabajo administrativos y clínicos en un entorno donde la precisión es literalmente vital.',
    tags:     ['Java', 'Automatización', 'Flujos de Trabajo', 'Sector Salud'],
    accent:   '#00d4ff',  // Color del borde superior al hover
    featured: true,       // Si es true, muestra el badge "★ Destacado"
    impact:   'Eficiencia operativa hospitalaria',
  },
  {
    id: 2, emoji: '📊',
    title: 'Motor de Conciliación Circular 030',
    desc:  'Solución técnica para la gestión y trazabilidad de radicados, pagos, glosas y notas crédito. Mantiene el equilibrio financiero de la cartera hospitalaria ante entes de control.',
    tags:     ['Análisis de Datos', 'Excel Avanzado', 'Conciliación', 'Reporte Regulatorio'],
    accent:   '#6c63ff',
    featured: true,
    impact:   'Control financiero de cartera',
  },
  {
    id: 3, emoji: '📋',
    title: 'Consolidador de Informes FT025',
    desc:  'Análisis y consolidación del informe de Ingresos y Radicados para reportes ante entes de control del sector salud. Proceso crítico con cero margen de error.',
    tags:     ['Reportería', 'Entes de Control', 'Sector Salud', 'Análisis'],
    accent:   '#00d4ff',
    featured: false,
    impact:   'Cumplimiento regulatorio',
  },
  {
    id: 4, emoji: '🛡️',
    title: 'Plan de Continuidad de Negocio (DR)',
    desc:  'Diseño y ejecución de planes de recuperación de desastres para infraestructura hospitalaria. Administración proactiva de servidores garantizando disponibilidad 24/7.',
    tags:     ['Backup/DR', 'Servidores', 'Alta Disponibilidad', 'Ciberseguridad'],
    accent:   '#6c63ff',
    featured: false,
    impact:   'Cero downtime en servicios críticos',
  },
  {
    id: 5, emoji: '🔧',
    title: 'Gestión de Infraestructura TIC',
    desc:  'Administración integral del parque informático: mantenimiento preventivo y correctivo, cotizaciones estratégicas y adquisiciones TIC alineadas con las necesidades de la entidad.',
    tags:     ['Infraestructura', 'Mantenimiento HW/SW', 'Gestión TIC', 'Inventario'],
    accent:   '#00d4ff',
    featured: false,
    impact:   'Parque informático optimizado',
  },
  {
    id: 6, emoji: '🤖',
    title: 'Automatización con IA & Prompt Engineering',
    desc:  'Flujos de trabajo aumentados con inteligencia artificial para optimizar análisis de datos, generación de informes y soporte técnico. IA aplicada a problemas reales del sector salud.',
    tags:     ['Prompt Engineering', 'LLMs', 'Automatización', 'Python'],
    accent:   '#6c63ff',
    featured: false,
    impact:   'Productividad aumentada con IA',
  },
]

// ── Tarjeta individual de proyecto ────────────────────────────────────────
function ProjectCard({ project, index }) {
  const ref    = useRef(null)
  // Se activa cuando la tarjeta entra en el viewport
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      // Animación: sube desde abajo con fade
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      // El delay varía según la columna (index % 3) para efecto escalonado en el grid
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="card p-6 group relative overflow-hidden flex flex-col"
    >
      {/* Borde superior de color — invisible por defecto, aparece al hover */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(to right, ${project.accent}, #6c63ff)` }}
      />

      {/* Badge "Destacado" — solo en proyectos con featured: true */}
      {project.featured && (
        <span className="absolute top-5 right-5 font-mono text-xs px-2.5 py-0.5 bg-cyan/10 border border-cyan/20 rounded-full text-cyan">
          ★ Destacado
        </span>
      )}

      {/* Emoji representativo del proyecto */}
      <span className="text-3xl mb-4 block">{project.emoji}</span>

      {/* Título — cambia a cian al hover gracias a la clase "group" del padre */}
      <h3 className="proj-title mb-2 group-hover:text-cyan transition-colors duration-200">
        {project.title}
      </h3>

      {/* Descripción del proyecto */}
      <p className="proj-desc mb-4 flex-1">{project.desc}</p>

      {/* Indicador de impacto — resume el valor generado */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xs text-cyan/60 font-mono">→ impacto:</span>
        <span className="text-xs text-cyan font-mono font-semibold">{project.impact}</span>
      </div>

      {/* Lista de tecnologías usadas en el proyecto */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((t) => (
          <span key={t} className="tech-tag">{t}</span>
        ))}
      </div>

      {/* Pie de tarjeta — muestra enlace al sitio si es público, o candado si es privado */}
      <div className="flex gap-3 mt-auto pt-3 border-t border-white/5">
        {project.link ? (
          // Proyecto público: botón que abre el sitio en una nueva pestaña
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-cyan flex items-center gap-1.5 font-mono font-semibold hover:text-white transition-colors"
          >
            {/* Ícono de enlace externo */}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Visitar sitio →
          </a>
        ) : (
          // Proyecto empresarial: indica que es privado
          <span className="text-xs text-slate-600 flex items-center gap-1.5 font-mono">
            🔒 Proyecto Empresarial
          </span>
        )}
      </div>
    </motion.div>
  )
}

// ── Componente principal de la sección ────────────────────────────────────
export default function Projects() {
  return (
    <div className="section-wrapper">

      {/* Encabezado de la sección */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-tag">// proyectos</p>
        <h2 className="section-title">Proyectos con Impacto Real</h2>
        <p className="section-sub">
          No prototipos de laboratorio — soluciones en producción donde cada línea de código importa
        </p>
        <div className="section-divider" />
      </motion.div>

      {/* Grid responsivo: 1 col en móvil, 2 en tablet, 3 en desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  )
}
