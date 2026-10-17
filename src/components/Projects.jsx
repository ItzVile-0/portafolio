// ─────────────────────────────────────────────────────────────────────────────
// Projects.jsx  —  Galería de proyectos (traducible ES/EN)
// Los datos visuales (emoji, acento, destacado, enlaces) viven aquí;
// título, descripción e impacto vienen del diccionario por clave.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'

// Metadatos de cada proyecto. 'key' enlaza con projects.items.<key> del diccionario.
// link = sitio web público · github = repositorio · (ambos opcionales)
const META = [
  { key: 'eroselle',   emoji: '🛒', accent: '#6c63ff', featured: true,  link: 'https://eroselleshop.com', github: null },
  { key: 'finanzas',   emoji: '📱', accent: '#00d4ff', featured: true,  link: null, github: 'https://github.com/ItzVile-0' },
  { key: 'circular030',emoji: '📊', accent: '#6c63ff', featured: false, link: null, github: null },
  { key: 'inventario', emoji: '📦', accent: '#00d4ff', featured: false, link: null, github: 'https://github.com/ItzVile-0' },
  { key: 'ft025',      emoji: '📋', accent: '#00d4ff', featured: false, link: null, github: null },
  { key: 'tickets',    emoji: '🎫', accent: '#6c63ff', featured: false, link: null, github: null },
]

const TAGS = {
  eroselle:    ['Fullstack', 'E-commerce', 'Pasarela de Pagos', 'Despliegue Web'],
  finanzas:    ['React Native', 'Android / iOS', 'Finanzas', 'Móvil'],
  circular030: ['Análisis de Datos', 'Excel Avanzado', 'Conciliación', 'Reportería'],
  inventario:  ['Next.js', 'PostgreSQL', 'Docker', 'CI/CD'],
  ft025:       ['Reportería', 'Entes de Control', 'Sector Salud', 'Análisis'],
  tickets:     ['Next.js', 'NestJS', 'React Native', 'Prisma'],
}

function ProjectCard({ meta, data, index, labels }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="card p-6 group relative overflow-hidden flex flex-col"
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
           style={{ background: `linear-gradient(to right, ${meta.accent}, #6c63ff)` }} />

      {meta.featured && (
        <span className="absolute top-5 right-5 font-mono text-xs px-2.5 py-0.5 bg-cyan/10 border border-cyan/20 rounded-full text-cyan">
          {labels.featured}
        </span>
      )}

      <span className="text-3xl mb-4 block">{meta.emoji}</span>
      <h3 className="proj-title mb-2 group-hover:text-cyan transition-colors duration-200">{data.title}</h3>
      <p className="proj-desc mb-4 flex-1">{data.desc}</p>

      <div className="mb-4 flex items-center gap-2">
        <span className="text-xs text-cyan/60 font-mono">{labels.impact}</span>
        <span className="text-xs text-cyan font-mono font-semibold">{data.impact}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {TAGS[meta.key].map((tag) => (
          <span key={tag} className="tech-tag">{tag}</span>
        ))}
      </div>

      {/* Pie: enlace al sitio, a GitHub, o marca de proyecto empresarial */}
      <div className="flex gap-4 mt-auto pt-3 border-t border-white/5">
        {meta.link && (
          <a href={meta.link} target="_blank" rel="noopener noreferrer"
             className="text-xs text-cyan flex items-center gap-1.5 font-mono font-semibold hover:text-white transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {labels.visit}
          </a>
        )}
        {meta.github && (
          <a href={meta.github} target="_blank" rel="noopener noreferrer"
             className="text-xs text-cyan flex items-center gap-1.5 font-mono font-semibold hover:text-white transition-colors">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            {labels.viewGithub}
          </a>
        )}
        {!meta.link && !meta.github && (
          <span className="text-xs text-slate-600 flex items-center gap-1.5 font-mono">{labels.enterprise}</span>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useLang()
  const items = t('projects.items')
  const labels = {
    impact: t('projects.impact'),
    visit: t('projects.visit'),
    viewGithub: t('projects.viewGithub'),
    enterprise: t('projects.enterprise'),
    featured: t('projects.featured'),
  }

  return (
    <div className="section-wrapper">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <p className="section-tag">{t('projects.tag')}</p>
        <h2 className="section-title">{t('projects.title')}</h2>
        <p className="section-sub">{t('projects.subtitle')}</p>
        <div className="section-divider" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {META.map((meta, i) => (
          <ProjectCard key={meta.key} meta={meta} data={items[meta.key]} index={i} labels={labels} />
        ))}
      </div>
    </div>
  )
}
