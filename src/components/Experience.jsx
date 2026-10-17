// ─────────────────────────────────────────────────────────────────────────────
// Experience.jsx  —  Línea de tiempo de experiencia laboral (traducible)
// Los datos visuales (logo, fondo, tags, si es actual) viven aquí;
// los textos (periodo, cargo, empresa, descripción, highlight) vienen
// del diccionario de traducciones por índice.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'

// Metadatos visuales de cada cargo (mismo orden que experience.items en el diccionario)
const META = [
  { logo: '/logo-freelance-f.png',    logoBg: 'bg-cyan/10',     tags: ['Next.js', 'React Native', 'NestJS', 'PostgreSQL', 'Docker', 'AWS'],           current: true  },
  { logo: '/logo-cootraemcali.png',   logoBg: 'bg-white/10',    tags: ['Soporte TI', 'Servidores', 'SARLAFT', 'Protección de Datos', 'Mesa de Ayuda'], current: false },
  { logo: '/logo-hsjd.png',           logoBg: 'bg-red-950/40',  tags: ['Automatización', 'Circular 030', 'FT025', 'Servidores', 'Backup/DR'],          current: false },
  { logo: '/logo-freelance-f.png',    logoBg: 'bg-cyan/10',     tags: ['Next.js', 'NestJS', 'React', 'Node.js', 'PostgreSQL', 'Git'],                  current: false },
  { logo: '/logo-unilibre.png',       logoBg: 'bg-red-950/30',  tags: ['Liderazgo Técnico', 'QA / Testing', 'Bases de Datos', 'Inventario TIC'],       current: false },
  { logo: '/logo-unilibre.png',       logoBg: 'bg-red-950/30',  tags: ['Soporte Técnico', 'Mantenimiento HW/SW', 'Imágenes de Sistema', 'Inventario'], current: false },
]

function TimelineItem({ item, meta, index, currentLabel }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
      className="relative pl-10"
    >
      <div className={`absolute left-0 top-2 w-3.5 h-3.5 rounded-full border-2 transition-all duration-500 -translate-x-1.5
        ${meta.current ? 'border-cyan bg-cyan shadow-[0_0_14px_rgba(0,212,255,0.65)]' : 'border-slate-600 bg-[#070712]'}`} />

      <div className="card p-6 hover:border-cyan/25 group">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl ${meta.logoBg} border border-white/10 flex items-center justify-center shrink-0 overflow-hidden p-1`}>
            <img src={meta.logo} alt={`Logo ${item.company}`} className="w-full h-full object-contain" />
          </div>

          <div className="flex-1 min-w-0">
            <span className="inline-block font-mono text-xs tracking-widest text-violet/80 bg-violet/10 border border-violet/20 rounded-full px-3 py-0.5 mb-2">
              {item.highlight}
            </span>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="tl-period">{item.period}</p>
                <h3 className="tl-role mt-0.5 group-hover:text-cyan transition-colors">{item.role}</h3>
                <p className="tl-company mt-0.5">
                  <span className="text-slate-300 font-medium">{item.company}</span>
                  <span className="text-slate-600 mx-1">·</span>
                  Cali, Colombia
                </p>
              </div>
              {meta.current && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan/10 border border-cyan/20 font-mono text-xs text-cyan shrink-0">
                  <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                  {currentLabel}
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="tl-desc mb-5">{item.desc}</p>

        <div className="flex flex-wrap gap-2">
          {meta.tags.map((tag) => (
            <span key={tag} className="tech-tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const { t } = useLang()
  const items = t('experience.items') // array traducido

  return (
    <div className="section-wrapper">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <p className="section-tag">{t('experience.tag')}</p>
        <h2 className="section-title">{t('experience.title')}</h2>
        <p className="section-sub">{t('experience.subtitle')}</p>
        <div className="section-divider" />
      </motion.div>

      <div className="relative">
        <div className="absolute left-1.5 top-2 bottom-4 w-px bg-gradient-to-b from-cyan/40 via-slate-700/50 to-transparent" />
        <div className="space-y-8">
          {items.map((item, i) => (
            <TimelineItem key={i} item={item} meta={META[i]} index={i} currentLabel={t('experience.current')} />
          ))}
        </div>
      </div>
    </div>
  )
}
