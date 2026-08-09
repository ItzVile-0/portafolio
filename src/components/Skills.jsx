// ─────────────────────────────────────────────────────────────────────────────
// Skills.jsx  —  Sección de habilidades técnicas y formación
// Tiene tres bloques:
//   1. Barras de progreso animadas agrupadas por categoría
//   2. Pills (pastillas) con todas las tecnologías y herramientas
//   3. Tarjetas de formación académica
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Categorías de habilidades con sus niveles de dominio (sobre 100) ───────
const SKILL_CATEGORIES = [
  {
    id: 'dev', title: 'Desarrollo de Software', icon: '⚙️',
    skills: [
      { name: 'Java',                 level: 85 },
      { name: 'Automatización',       level: 88 },
      { name: 'SQL / Bases de Datos', level: 82 },
      { name: 'Python / Scripts',     level: 72 },
    ],
  },
  {
    id: 'infra', title: 'Infraestructura & Redes', icon: '🖥️',
    skills: [
      { name: 'Administración de Servidores', level: 87 },
      { name: 'Redes LAN/WAN',               level: 83 },
      { name: 'Backup & Disaster Recovery',   level: 90 },
      { name: 'Mantenimiento HW/SW',          level: 92 },
    ],
  },
  {
    id: 'cyber', title: 'Ciberseguridad', icon: '🛡️',
    skills: [
      { name: 'Ciberseguridad Organizacional', level: 80 },
      { name: 'Planes de Continuidad (DR)',    level: 88 },
      { name: 'Auditoría de Sistemas',         level: 78 },
      { name: 'Gestión de Riesgos / SARLAFT',  level: 80 },
    ],
  },
  {
    id: 'data', title: 'Datos, IA & Gestión', icon: '📊',
    skills: [
      { name: 'Excel Avanzado / Reportes', level: 90 },
      { name: 'Análisis de Datos',         level: 82 },
      { name: 'Prompt Engineering / LLMs', level: 85 },
      { name: 'Inglés B2',                 level: 78 },
    ],
  },
]

// ── Lista de tecnologías para las pills ────────────────────────────────────
const TECH_STACK = [
  'Java', 'Python', 'SQL', 'MySQL', 'Excel', 'Git',
  'Windows Server', 'Linux', 'Active Directory', 'TCP/IP',
  'Backup/DR', 'VMware', 'LangChain', 'OpenAI API',
  'JasperReports', 'JDBC', 'REST APIs', 'Bash/Shell',
  'Ciberseguridad', 'SARLAFT', 'Redes LAN/WAN', 'Inventario TIC',
]

// ── Títulos académicos obtenidos ───────────────────────────────────────────
const CERTIFICATIONS = [
  {
    title:       'Diplomado en Ciberseguridad Digital',
    institution: 'Institución Universitaria Antonio José Camacho',
    date:        'Dic 2024 – May 2025',
    icon:        '🛡️',
  },
  {
    title:       'Ingeniería de Sistemas',
    institution: 'Institución Universitaria Antonio José Camacho',
    date:        'Ago 2022 – Dic 2024',
    icon:        '🎓',
  },
  {
    title:       'Tecnología en Sistemas de Información',
    institution: 'Fundación FCECEP',
    date:        'Ene 2017 – Ene 2020',
    icon:        '📜',
  },
]

// ── Componente de barra de habilidad individual ───────────────────────────
// Se anima desde 0% hasta el nivel real cuando entra en pantalla
function SkillBar({ skill, delay = 0 }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="mb-4">
      {/* Nombre de la habilidad y porcentaje */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-slate-300">{skill.name}</span>
        <span className="font-mono text-xs text-cyan">{skill.level}%</span>
      </div>
      {/* Track (fondo gris) de la barra */}
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        {/* Barra de progreso animada con degradado cian→violeta */}
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(to right, #00d4ff, #6c63ff)' }}
          initial={{ width: 0 }}                                    // Empieza en 0%
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }} // Anima al nivel real
          transition={{ duration: 1, delay, ease: 'easeOut' }}     // 1s de duración suave
        />
      </div>
    </div>
  )
}

// ── Tarjeta de categoría de habilidades ───────────────────────────────────
function SkillCard({ category, cardIndex }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      // Cada tarjeta espera 100ms más que la anterior
      transition={{ duration: 0.5, delay: cardIndex * 0.1 }}
      className="card p-6"
    >
      {/* Encabezado de categoría: emoji + nombre */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">{category.icon}</span>
        <h3 className="text-base font-semibold text-slate-200">{category.title}</h3>
      </div>
      {/* Barras de habilidades de esta categoría */}
      {category.skills.map((skill, i) => (
        // El delay aumenta con cada barra para animación escalonada
        <SkillBar key={skill.name} skill={skill} delay={0.1 + i * 0.08} />
      ))}
    </motion.div>
  )
}

// ── Componente principal de la sección ────────────────────────────────────
export default function Skills() {
  // Referencias para detectar cuando cada bloque entra al viewport
  const stackRef    = useRef(null)
  const certRef     = useRef(null)
  const stackInView = useInView(stackRef, { once: true, margin: '-60px' })
  const certInView  = useInView(certRef,  { once: true, margin: '-60px' })

  return (
    <div className="section-wrapper">

      {/* Encabezado de la sección */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-tag">habilidades</p>
        <h2 className="section-title">Stack Técnico & Competencias</h2>
        <p className="section-sub">Dominio real, probado en entornos de alta exigencia</p>
        <div className="section-divider" />
      </motion.div>

      {/* Grid 2×2 de tarjetas de habilidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
        {SKILL_CATEGORIES.map((cat, i) => (
          <SkillCard key={cat.id} category={cat} cardIndex={i} />
        ))}
      </div>

      {/* ── Bloque de pills de tecnologías ── */}
      <motion.div
        ref={stackRef}
        initial={{ opacity: 0 }}
        animate={stackInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="font-mono text-sm text-slate-500 tracking-widest mb-4 uppercase">
          tecnologías & herramientas
        </p>
        <div className="flex flex-wrap gap-2.5">
          {TECH_STACK.map((tech, i) => (
            <motion.span
              key={tech}
              // Cada pill aparece con un pequeño retraso escalonado
              initial={{ opacity: 0, scale: 0.8 }}
              animate={stackInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.025, duration: 0.3 }}
              // Al hover: se vuelve cian con borde cian tenue
              className="px-3.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]
                         font-mono text-sm text-slate-400 hover:text-cyan hover:border-cyan/20
                         hover:bg-cyan/5 transition-all duration-200 cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* ── Bloque de formación académica ── */}
      <motion.div
        ref={certRef}
        initial={{ opacity: 0, y: 20 }}
        animate={certInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-sm text-slate-500 tracking-widest mb-4 uppercase">
          formación académica
        </p>
        {/* Grid de tarjetas de títulos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 16 }}
              animate={certInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card p-5 hover:border-cyan/20 group"
            >
              {/* Emoji del tipo de título */}
              <span className="text-3xl mb-3 block">{cert.icon}</span>
              {/* Nombre del título */}
              <h4 className="text-sm font-semibold text-slate-200 mb-2 group-hover:text-cyan transition-colors leading-snug">
                {cert.title}
              </h4>
              {/* Institución */}
              <p className="text-sm text-slate-500 mb-2 leading-relaxed">{cert.institution}</p>
              {/* Período */}
              <span className="font-mono text-xs text-cyan/60">{cert.date}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
