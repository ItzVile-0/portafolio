// ─────────────────────────────────────────────────────────────────────────────
// Skills.jsx  —  Habilidades técnicas y formación (traducible ES/EN)
// Los niveles y nombres técnicos viven aquí; los títulos de sección,
// nombres de categoría y certificaciones vienen del diccionario.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'

// Categorías: 'key' enlaza con skills.categories.<key>; los skills son técnicos (no se traducen)
const SKILL_CATEGORIES = [
  { key: 'dev',   icon: '⚙️', skills: [
    { name: 'JavaScript / TypeScript', level: 88 },
    { name: 'Next.js / React',         level: 87 },
    { name: 'NestJS / Node.js',        level: 85 },
    { name: 'Java / C# / Python',      level: 78 },
  ]},
  { key: 'infra', icon: '🖥️', skills: [
    { name: 'Administración de Servidores', level: 87 },
    { name: 'Redes LAN/WAN',               level: 83 },
    { name: 'Backup & Disaster Recovery',   level: 90 },
    { name: 'Docker / CI/CD',               level: 82 },
  ]},
  { key: 'cyber', icon: '🛡️', skills: [
    { name: 'Ciberseguridad',            level: 80 },
    { name: 'Protección de Datos',       level: 85 },
    { name: 'SARLAFT / Cumplimiento',    level: 82 },
    { name: 'Auditoría de Sistemas',     level: 78 },
  ]},
  { key: 'data',  icon: '📊', skills: [
    { name: 'SQL Server / PostgreSQL', level: 85 },
    { name: 'Power BI / Análisis',     level: 80 },
    { name: 'Agentes de IA / LLMs',    level: 82 },
    { name: 'Inglés B2',               level: 78 },
  ]},
]

const TECH_STACK = [
  'JavaScript', 'TypeScript', 'Next.js', 'React', 'React Native', 'NestJS', 'Node.js',
  'Angular', 'Java', 'C#', 'Python', '.NET', 'PostgreSQL', 'SQL Server', 'MongoDB',
  'Docker', 'CI/CD', 'AWS', 'Azure', 'Git/GitHub', 'Linux', 'Power BI', 'Prisma', 'REST APIs',
]

function SkillBar({ skill, delay = 0 }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-slate-300">{skill.name}</span>
        <span className="font-mono text-xs text-cyan">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(to right, #00d4ff, #6c63ff)' }}
          initial={{ width: 0 }} animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: 'easeOut' }} />
      </div>
    </div>
  )
}

function SkillCard({ category, title, cardIndex }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: cardIndex * 0.1 }} className="card p-6">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">{category.icon}</span>
        <h3 className="text-base font-semibold text-slate-200">{title}</h3>
      </div>
      {category.skills.map((skill, i) => (
        <SkillBar key={skill.name} skill={skill} delay={0.1 + i * 0.08} />
      ))}
    </motion.div>
  )
}

export default function Skills() {
  const { t } = useLang()
  const stackRef = useRef(null); const certRef = useRef(null)
  const stackInView = useInView(stackRef, { once: true, margin: '-60px' })
  const certInView  = useInView(certRef,  { once: true, margin: '-60px' })
  const certs = t('skills.certs')
  const certIcons = ['🛡️', '🎓', '📜']

  return (
    <div className="section-wrapper">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <p className="section-tag">{t('skills.tag')}</p>
        <h2 className="section-title">{t('skills.title')}</h2>
        <p className="section-sub">{t('skills.subtitle')}</p>
        <div className="section-divider" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {SKILL_CATEGORIES.map((cat, i) => (
          <SkillCard key={cat.key} category={cat} title={t(`skills.categories.${cat.key}`)} cardIndex={i} />
        ))}
      </div>

      <motion.div ref={stackRef} initial={{ opacity: 0 }} animate={stackInView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }} className="mb-12">
        <p className="font-mono text-sm text-slate-500 tracking-widest mb-4 uppercase">{t('skills.tech')}</p>
        <div className="flex flex-wrap gap-2.5">
          {TECH_STACK.map((tech, i) => (
            <motion.span key={tech} initial={{ opacity: 0, scale: 0.8 }} animate={stackInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.025, duration: 0.3 }}
              className="px-3.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] font-mono text-sm text-slate-400 hover:text-cyan hover:border-cyan/20 hover:bg-cyan/5 transition-all duration-200 cursor-default">
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div ref={certRef} initial={{ opacity: 0, y: 20 }} animate={certInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
        <p className="font-mono text-sm text-slate-500 tracking-widest mb-4 uppercase">{t('skills.education')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {certs.map((cert, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={certInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }} className="card p-5 hover:border-cyan/20 group">
              <span className="text-3xl mb-3 block">{certIcons[i]}</span>
              <h4 className="text-sm font-semibold text-slate-200 mb-2 group-hover:text-cyan transition-colors leading-snug">{cert.title}</h4>
              <p className="text-sm text-slate-500 mb-2 leading-relaxed">{cert.institution}</p>
              <span className="font-mono text-xs text-cyan/60">{cert.date}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
