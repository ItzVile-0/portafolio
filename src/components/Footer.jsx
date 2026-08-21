// ─────────────────────────────────────────────────────────────────────────────
// Footer.jsx  —  Pie de página
// Muestra nombre, rol y ubicación. El año se calcula automáticamente.
// ─────────────────────────────────────────────────────────────────────────────

import Logo from './Logo'

export default function Footer() {
  // Obtiene el año actual dinámicamente para no tener que actualizarlo manualmente
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 py-8 mt-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-4 text-xs text-slate-600 font-mono">

        {/* Fila principal: marca, rol y ubicación */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Marca personal con logo hexagonal */}
          <div className="flex items-center gap-2.5">
            <Logo size={28} />
            <span className="text-slate-400 font-semibold">Camilo A. Cabrera González</span>
          </div>

          {/* Rol profesional y año (se actualiza automáticamente) */}
          <p>
            Ingeniero de Sistemas &amp; Especialista en Ciberseguridad · {year}
          </p>

          {/* Ubicación con punto de estado animado (indica disponibilidad) */}
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            Cali, Valle del Cauca · Colombia
          </p>
        </div>

        {/* Fila inferior: matrícula profesional COPNIA (respaldo formal) */}
        <div className="flex items-center justify-center gap-2 pt-3 border-t border-white/5 text-slate-700">
          <svg className="w-3.5 h-3.5 text-cyan/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Matrícula Profesional COPNIA · 171122-0842239 VLL</span>
        </div>

      </div>
    </footer>
  )
}
