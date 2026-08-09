// ─────────────────────────────────────────────────────────────────────────────
// Logo.jsx  —  Marca personal animada (monograma en hexágono tech)
// Un hexágono con borde de degradado cian→violeta, las iniciales "CC"
// en el centro y un punto orbital que gira alrededor. Reutilizable en
// el Header (tamaño pequeño) y donde se necesite.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion'

// size → controla el tamaño en píxeles del logo (por defecto 34)
export default function Logo({ size = 34 }) {
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="overflow-visible"
      >
        <defs>
          {/* Degradado cian → violeta para el borde del hexágono */}
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#6c63ff" />
          </linearGradient>
          {/* Filtro de brillo suave */}
          <filter id="logoGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Hexágono de fondo (relleno oscuro translúcido) */}
        <polygon
          points="50,6 89,28 89,72 50,94 11,72 11,28"
          fill="#0d0d1f"
          stroke="url(#logoGrad)"
          strokeWidth="4"
          filter="url(#logoGlow)"
        />

        {/* Línea de "pulso" horizontal — evoca un latido / señal técnica */}
        <polyline
          points="24,50 38,50 44,40 52,62 58,50 76,50"
          fill="none"
          stroke="url(#logoGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
      </svg>

      {/* Punto orbital que gira alrededor del hexágono */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="absolute rounded-full bg-cyan"
          style={{
            width: size * 0.09,
            height: size * 0.09,
            top: -size * 0.02,
            left: '50%',
            transform: 'translateX(-50%)',
            boxShadow: '0 0 6px rgba(0,212,255,0.9)',
          }}
        />
      </motion.div>
    </div>
  )
}
