// ─────────────────────────────────────────────────────────────────────────────
// Footer.jsx  —  Pie de página (traducible ES/EN)
// ─────────────────────────────────────────────────────────────────────────────

import Logo from './Logo'
import { useLang } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 py-8 mt-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-4 text-xs text-slate-600 font-mono">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Logo size={28} />
            <span className="text-slate-400 font-semibold">Camilo A. Cabrera González</span>
          </div>
          <p>{t('footer.role')} · {year}</p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            {t('footer.location')}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 pt-3 border-t border-white/5 text-slate-700">
          <svg className="w-3.5 h-3.5 text-cyan/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{t('footer.copnia')}</span>
        </div>
      </div>
    </footer>
  )
}
