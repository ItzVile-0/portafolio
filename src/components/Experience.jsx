// ─────────────────────────────────────────────────────────────────────────────
// Experience.jsx  —  Línea de tiempo de experiencia laboral
// Cada cargo se muestra como una tarjeta en una línea de tiempo vertical.
// La tarjeta actual tiene un punto luminoso (cian) mientras las pasadas
// tienen un punto gris. Cada tarjeta incluye el logo de la empresa.
// ─────────────────────────────────────────────────────────────────────────────

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Datos de la trayectoria laboral ───────────────────────────────────────
// Cada objeto representa un cargo. Orden: más reciente primero.
const EXPERIENCE = [
  {
    id: 1,
    period:      'May 2026 – Actualidad',
    role:        'Asistente TIC',
    company:     'Cootraemcali',                                    // Nombre corto para la tarjeta
    companyFull: 'Cooperativa de Trabajadores de Emcali',           // Nombre completo
    location:    'Cali, Colombia',
    logo:        '/logo-cootraemcali.png',                          // Ruta relativa desde /public
    logoBg:      'bg-white/10',                                     // Fondo del contenedor del logo
    tags: ['Infraestructura', 'Seguridad de la Información', 'Bases de Datos', 'SARLAFT', 'Mesa de Ayuda', 'Backup/DR'],
    current:   true,                                                // Muestra badge "Actual" y punto luminoso
    highlight: 'Sector Financiero — Cooperativa de Ahorro y Crédito',
    desc: [
      'Administro la plataforma de servidores y lidero el mantenimiento preventivo y correctivo de hardware y software para garantizar la continuidad operativa de los servicios financieros.',
      'Ejecuto las políticas de seguridad de la información, administro bases de datos y gestiono el ciclo completo de copias de seguridad (custodia y restauración) conforme a estándares del sector.',
      'Resuelvo requerimientos técnicos de usuarios y terceros, gestionando eficazmente la matriz de tickets y brindando soporte integral a equipos y aplicaciones de negocio.',
      'Aseguro que todos los procesos tecnológicos cumplan con la Ley de Protección de Datos Personales y los manuales de gestión de riesgos SARLAFT de la entidad.',
      'Realizo actualizaciones y parametrizaciones en los sistemas de información, entregando informes de gestión para la mejora continua de los servicios tecnológicos.',
    ],
  },
  {
    id: 2,
    period:      'Mar 2024 – May 2026',
    role:        'Auxiliar de Sistemas y Cartera',
    company:     'Hospital San Juan de Dios',
    companyFull: 'Hospital Universitario San Juan de Dios',
    location:    'Cali, Colombia',
    logo:        '/logo-hsjd.png',
    logoBg:      'bg-red-950/40',
    tags: ['Desarrollo de Software', 'Administración de Servidores', 'Ciberseguridad', 'Backup/DR', 'FT025', 'Circular 030'],
    current:   false,
    highlight: 'Sector Salud — Entorno de misión crítica',
    desc: [
      'Diseñé e implementé aplicaciones internas que automatizaron flujos de trabajo hospitalarios, incrementando la eficiencia operativa del área de sistemas.',
      'Administré proactivamente servidores y redes garantizando disponibilidad 24/7, incluyendo diseño y ejecución de planes de recuperación de desastres (backups).',
      'Lideré el mantenimiento preventivo y correctivo del parque informático y gestioné adquisiciones TIC estratégicas para la entidad.',
      'Especialista en el análisis y consolidación del informe crítico FT025 (Ingresos y Radicados) para reportes ante entes de control.',
      'Construí técnicamente la Circular 030, gestionando trazabilidad de radicados, pagos, glosas y notas crédito para el equilibrio financiero de la cartera hospitalaria.',
    ],
  },
  {
    id: 3,
    period:      'Ene 2022 – Oct 2022',
    role:        'Coordinador de Salas de Cómputo',
    company:     'Universidad Libre',
    companyFull: 'Corporación Universidad Libre',
    location:    'Cali, Colombia',
    logo:        '/logo-unilibre.png',
    logoBg:      'bg-red-950/30',
    tags: ['Liderazgo Técnico', 'QA / Testing', 'Bases de Datos', 'Inventario TIC', 'Licencias de Software'],
    current:   false,
    highlight: 'Sector Educativo — Liderazgo de equipos técnicos',
    desc: [
      'Coordiné y evalué el desempeño del personal técnico, asegurando el cumplimiento de estándares de servicio en todos los proyectos del equipo.',
      'Lideré proyectos de desarrollo de software incluyendo la fase crítica de pruebas (QA) para garantizar la estabilidad y funcionalidad de los sistemas.',
      'Administré bases de datos, inventarios y licencias de software especializado, optimizando el uso de los recursos tecnológicos de la institución.',
    ],
  },
  {
    id: 4,
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
    desc: [
      'Realicé mantenimiento preventivo y correctivo de hardware y software asegurando operatividad constante de más de 80 estaciones de trabajo académicas.',
      'Proporcioné soporte técnico presencial a estudiantes y docentes, resolviendo incidencias críticas en tiempo real durante sesiones de clase.',
      'Gestioné inventario de equipos e implementación de imágenes de sistema (formateo y software ofimático) garantizando estándares institucionales.',
    ],
  },
]

// ── Componente de ítem individual de la línea de tiempo ───────────────────
function TimelineItem({ item, index }) {
  const ref    = useRef(null)
  // useInView: devuelve true cuando el elemento entra en pantalla
  // once: true → la animación solo ocurre la primera vez
  // margin: añade un margen de activación antes de que el elemento sea visible
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      // Animación de entrada: viene desde la izquierda con fade
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      // Cada ítem espera 100ms más que el anterior (delay: index * 0.1)
      transition={{ duration: 0.55, delay: index * 0.1, ease: 'easeOut' }}
      className="relative pl-10" // pl-10 deja espacio para el punto de la línea de tiempo
    >

      {/* Punto de la línea de tiempo — cian y luminoso si es el cargo actual */}
      <div className={`absolute left-0 top-2 w-3.5 h-3.5 rounded-full border-2 transition-all duration-500 -translate-x-1.5
        ${item.current
          ? 'border-cyan bg-cyan shadow-[0_0_14px_rgba(0,212,255,0.65)]' // Activo: relleno cian con halo
          : 'border-slate-600 bg-[#070712]'                               // Pasado: círculo vacío gris
        }`}
      />

      {/* Tarjeta del cargo */}
      <div className="card p-6 hover:border-cyan/25 group">

        {/* ── Cabecera: logo + info ── */}
        <div className="flex items-start gap-4 mb-4">

          {/* Contenedor del logo de la empresa */}
          <div className={`w-12 h-12 rounded-xl ${item.logoBg} border border-white/10 flex items-center justify-center shrink-0 overflow-hidden p-1`}>
            <img
              src={item.logo}
              alt={`Logo ${item.company}`}
              className="w-full h-full object-contain" // object-contain: no recorta el logo
            />
          </div>

          {/* Información del cargo */}
          <div className="flex-1 min-w-0">
            {/* Badge de sector (ej: "Sector Financiero — Cooperativa de Ahorro y Crédito") */}
            <span className="inline-block font-mono text-xs tracking-widest text-violet/80 bg-violet/10 border border-violet/20 rounded-full px-3 py-0.5 mb-2">
              {item.highlight}
            </span>

            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                {/* Período de trabajo */}
                <p className="tl-period">{item.period}</p>
                {/* Nombre del cargo — cambia a cian al hover gracias a "group" */}
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
                  <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" /> {/* Punto pulsante */}
                  Actual
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Lista de logros y responsabilidades */}
        <ul className="space-y-2.5 mb-5">
          {item.desc.map((d, i) => (
            <li key={i} className="tl-desc flex gap-2.5">
              <span className="text-cyan/60 mt-1 shrink-0">›</span> {/* Flecha de viñeta */}
              {d}
            </li>
          ))}
        </ul>

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
        whileInView={{ opacity: 1, y: 0 }} // Se anima cuando entra en el viewport
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="section-tag">// experiencia</p>
        <h2 className="section-title">Trayectoria Profesional</h2>
        <p className="section-sub">
          4+ años en sectores donde fallar no es una opción — finanzas, salud y educación
        </p>
        <div className="section-divider" />
      </motion.div>

      {/* Contenedor de la línea de tiempo */}
      <div className="relative">
        {/* Línea vertical decorativa — va de arriba abajo con degradado que desaparece */}
        <div className="absolute left-1.5 top-2 bottom-4 w-px bg-gradient-to-b from-cyan/40 via-slate-700/50 to-transparent" />

        {/* Lista de cargos */}
        <div className="space-y-8">
          {EXPERIENCE.map((item, i) => (
            // Cada ítem recibe su índice para el delay de animación escalonada
            <TimelineItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
