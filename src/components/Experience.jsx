// ─────────────────────────────────────────────────────────────────────────────
// Experience.jsx  —  Línea de tiempo de experiencia laboral
// Cada cargo se muestra como una tarjeta en una línea de tiempo vertical.
// La tarjeta actual tiene un punto luminoso (cian) mientras las pasadas
// tienen un punto gris. Cada tarjeta incluye el logo (imagen o emoji) y
// una descripción en prosa de corrido.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Datos de la trayectoria laboral ───────────────────────────────────────
// Cada objeto representa un cargo. Orden: más reciente primero.
// 'logo' es una imagen desde /public; si no hay, se usa 'logoEmoji'.
// 'desc' es un único texto en prosa (no viñetas).
const EXPERIENCE = [
  {
    id: 0,
    period:      'Ago 2026 – Actualidad',
    role:        'Desarrollador Full-Stack (Web y Móvil)',
    company:     'Trabajo independiente',
    companyFull: 'Trabajo independiente',
    location:    'Cali, Colombia',
    logo:        '/logo-freelance-f.png',
    logoBg:      'bg-cyan/10',
    tags: ['Next.js', 'React Native', 'NestJS', 'PostgreSQL', 'Docker', 'AWS'],
    current:   true,
    highlight: 'Freelance — Soluciones a medida para PYMES',
    desc: 'Desarrollo aplicaciones web y móviles a la medida para negocios y PYMES con Next.js, React Native, NestJS y Node.js. Levanto requerimientos con cada cliente y traduzco necesidades de negocio en soluciones funcionales, usables y de rápida entrega. Modelo bases de datos relacionales en PostgreSQL e integro servicios de terceros como pasarelas de pago, autenticación y APIs REST, con control de versiones en Git/GitHub y despliegue continuo en la nube (Vercel, AWS, Docker). Además brindo mantenimiento, soporte y mejoras evolutivas post-entrega, asegurando la disponibilidad y la satisfacción del cliente.',
  },
  {
    id: 1,
    period:      'May 2026 – Jul 2026',
    role:        'Asistente TIC',
    company:     'Cootraemcali',
    companyFull: 'Cooperativa Cootraemcali',
    location:    'Cali, Colombia',
    logo:        '/logo-cootraemcali.png',
    logoBg:      'bg-white/10',
    tags: ['Soporte TI', 'Servidores', 'SARLAFT', 'Protección de Datos', 'Mesa de Ayuda'],
    current:   false,
    highlight: 'Sector Financiero — Cooperativa de Ahorro y Crédito',
    desc: 'Brindé soporte técnico integral resolviendo una matriz de más de 80 tickets mensuales de mesa de ayuda a usuarios, y administré una plataforma de cerca de 15 servidores que garantizaba la continuidad operativa de los servicios financieros. Realicé actualizaciones y parametrizaciones en los sistemas de información para asegurar su integración y correcto funcionamiento, aplicando en todo momento los controles de cumplimiento de Protección de Datos y SARLAFT propios del sector.',
  },
  {
    id: 2,
    period:      'Mar 2024 – Mar 2026',
    role:        'Auxiliar de Sistemas y Cartera',
    company:     'Hospital San Juan de Dios',
    companyFull: 'Hospital de San Juan de Dios',
    location:    'Cali, Colombia',
    logo:        '/logo-hsjd.png',
    logoBg:      'bg-red-950/40',
    tags: ['Automatización', 'Circular 030', 'FT025', 'Servidores', 'Backup/DR', 'Soporte TI'],
    current:   false,
    highlight: 'Sector Salud — Entorno de misión crítica',
    desc: 'Diseñé e implementé aplicaciones internas que automatizaron flujos de trabajo y redujeron los tiempos de procesamiento en un 35%, y construí técnicamente la Circular 030 con trazabilidad de más de 40.000 radicados, pagos, glosas y notas crédito. Garanticé la disponibilidad y el despliegue de los servicios mediante la administración de servidores, redes y planes de recuperación ante desastres. También brindé soporte técnico a los usuarios y consolidé informes críticos para entes de control (Ingresos y Radicados – FT025), cumpliendo el 100% de los plazos establecidos.',
  },
  {
    id: 3,
    period:      'Oct 2022 – Mar 2024',
    role:        'Desarrollador Full-Stack Freelance',
    company:     'Proyectos independientes',
    companyFull: 'Proyectos independientes',
    location:    'Cali, Colombia',
    logo:        '/logo-freelance-f.png',
    logoBg:      'bg-cyan/10',
    tags: ['Next.js', 'NestJS', 'React', 'Node.js', 'PostgreSQL', 'Git'],
    current:   false,
    highlight: 'Freelance — Desarrollo web y e-commerce',
    desc: 'Desarrollé aplicaciones web y tiendas e-commerce a medida de extremo a extremo con Next.js, NestJS, React y Node.js. Modelé bases de datos relacionales en PostgreSQL e integré APIs y servicios de terceros como pasarelas de pago y autenticación. Gestioné el control de versiones con Git y el despliegue en la nube (Vercel, AWS), realizando las entregas bajo metodología ágil.',
  },
  {
    id: 4,
    period:      'Ene 2022 – Oct 2022',
    role:        'Coordinador de Salas de Cómputo',
    company:     'Universidad Libre',
    companyFull: 'Corporación Universidad Libre',
    location:    'Cali, Colombia',
    logo:        '/logo-unilibre.png',
    logoBg:      'bg-red-950/30',
    tags: ['Liderazgo Técnico', 'QA / Testing', 'Bases de Datos', 'Inventario TIC'],
    current:   false,
    highlight: 'Sector Educativo — Liderazgo de equipos técnicos',
    desc: 'Lideré proyectos de desarrollo de software, incluida la fase de pruebas, para garantizar la estabilidad y funcionalidad de los sistemas. Coordiné un equipo de 6 técnicos de soporte, evaluando su desempeño y el cumplimiento de los estándares de servicio, y administré bases de datos, inventarios y licencias de software especializado de la institución.',
  },
  {
    id: 5,
    period:      'Ago 2018 – Ago 2019',
    role:        'Monitor de Salas de Cómputo',
    company:     'Universidad Libre',
    companyFull: 'Corporación Universidad Libre',
    location:    'Cali, Colombia',
    logo:        '/logo-unilibre.png',
    logoBg:      'bg-red-950/30',
    tags: ['Soporte Técnico', 'Mantenimiento HW/SW', 'Imágenes de Sistema', 'Inventario'],
    current:   false,
    highlight: 'Sector Educativo — Base técnica sólida',
    desc: 'Brindé soporte técnico y mantenimiento preventivo y correctivo a más de 60 estaciones de trabajo, gestionando el inventario de equipos y la implementación de imágenes de sistema. Aseguré la operatividad constante de los laboratorios para estudiantes y docentes, resolviendo incidencias en tiempo real durante las sesiones de clase.',
  },
]

// ── Componente de ítem individual de la línea de tiempo ───────────────────
function TimelineItem({ item, index }) {
  const ref    = useRef(null)
  // useInView: devuelve true cuando el elemento entra en pantalla
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
      className="relative pl-10"
    >
      {/* Punto de la línea de tiempo — cian y luminoso si es el cargo actual */}
      <div className={`absolute left-0 top-2 w-3.5 h-3.5 rounded-full border-2 transition-all duration-500 -translate-x-1.5
        ${item.current
          ? 'border-cyan bg-cyan shadow-[0_0_14px_rgba(0,212,255,0.65)]'
          : 'border-slate-600 bg-[#070712]'
        }`}
      />

      {/* Tarjeta del cargo */}
      <div className="card p-6 hover:border-cyan/25 group">

        {/* ── Cabecera: logo + info ── */}
        <div className="flex items-start gap-4 mb-4">

          {/* Contenedor del logo: imagen de empresa o emoji si no hay logo */}
          <div className={`w-12 h-12 rounded-xl ${item.logoBg} border border-white/10 flex items-center justify-center shrink-0 overflow-hidden p-1`}>
            {item.logo ? (
              <img
                src={item.logo}
                alt={`Logo ${item.company}`}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-2xl">{item.logoEmoji}</span>
            )}
          </div>

          {/* Información del cargo */}
          <div className="flex-1 min-w-0">
            {/* Badge de sector / tipo de trabajo */}
            <span className="inline-block font-mono text-xs tracking-widest text-violet/80 bg-violet/10 border border-violet/20 rounded-full px-3 py-0.5 mb-2">
              {item.highlight}
            </span>

            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                {/* Período de trabajo */}
                <p className="tl-period">{item.period}</p>
                {/* Nombre del cargo — cambia a cian al hover */}
                <h3 className="tl-role mt-0.5 group-hover:text-cyan transition-colors">{item.role}</h3>
                {/* Nombre de empresa y ciudad */}
                <p className="tl-company mt-0.5">
                  <span className="text-slate-300 font-medium">{item.company}</span>
                  <span className="text-slate-600 mx-1">·</span>
                  {item.location}
                </p>
              </div>

              {/* Badge "Actual" — solo visible en el cargo actual */}
              {item.current && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan/10 border border-cyan/20 font-mono text-xs text-cyan shrink-0">
                  <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                  Actual
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Descripción del cargo en prosa de corrido (un solo párrafo) */}
        <p className="tl-desc mb-5">{item.desc}</p>

        {/* Tags de tecnologías / habilidades usadas en el cargo */}
        <div className="flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ── Componente principal de la sección ────────────────────────────────────
export default function Experience() {
  return (
    <div className="section-wrapper">

      {/* Encabezado animado de la sección */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-tag">experiencia</p>
        <h2 className="section-title">Trayectoria Profesional</h2>
        <p className="section-sub">
          4+ años combinando desarrollo de software, soporte TI e infraestructura en sectores críticos
        </p>
        <div className="section-divider" />
      </motion.div>

      {/* Contenedor de la línea de tiempo */}
      <div className="relative">
        {/* Línea vertical decorativa con degradado */}
        <div className="absolute left-1.5 top-2 bottom-4 w-px bg-gradient-to-b from-cyan/40 via-slate-700/50 to-transparent" />

        {/* Lista de cargos */}
        <div className="space-y-8">
          {EXPERIENCE.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
