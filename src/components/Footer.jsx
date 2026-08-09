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
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600 font-mono">

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
    </footer>
  )
}
