// ─────────────────────────────────────────────────────────────────────────────
// Contact.jsx  —  Sección de contacto (traducible ES/EN)
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'

function RichText({ text }) {
  const parts = text.split(/(<c>.*?<\/c>)/g)
  return parts.map((part, i) =>
    part.startsWith('<c>')
      ? <strong key={i} className="text-cyan">{part.slice(3, -4)}</strong>
      : part
  )
}

export default function Contact() {
  const { t } = useLang()
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Enlaces (los valores no se traducen; solo las etiquetas Email/Teléfono)
  const links = [
    {
      icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>),
      label: t('contact.links.email'), value: 'camiloalejo29@hotmail.es', href: 'mailto:camiloalejo29@hotmail.es',
    },
    {
      icon: (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>),
      label: t('contact.links.phone'), value: '+57 302 676 2269', href: 'https://wa.me/573026762269',
    },
    {
      icon: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>),
      label: 'LinkedIn', value: 'linkedin.com/in/camilo-cabrera-95464533b', href: 'https://www.linkedin.com/in/camilo-cabrera-95464533b',
    },
    {
      icon: (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>),
      label: 'GitHub', value: 'github.com/ItzVile-0', href: 'https://github.com/ItzVile-0',
    },
  ]

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    const subject = `Portafolio – ${form.name}`
    const body    = `Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    window.open(`mailto:camiloalejo29@hotmail.es?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setStatus(null), 4000)
  }

  return (
    <div className="section-wrapper">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <p className="section-tag">{t('contact.tag')}</p>
        <h2 className="section-title">{t('contact.title')}</h2>
        <p className="section-sub">{t('contact.subtitle')}</p>
        <div className="section-divider" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="mb-10 p-6 rounded-xl border border-cyan/20 bg-cyan/5">
        <p className="text-slate-300 text-base leading-relaxed"><RichText text={t('contact.cta')} /></p>
      </motion.div>

      <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        <div className="space-y-3">
          {links.map((link) => (
            <a key={link.label} href={link.href} target={link.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 card hover:border-cyan/30 hover:bg-cyan/5 group transition-all duration-200 block">
              <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center text-cyan group-hover:bg-cyan/20 transition-colors shrink-0">
                {link.icon}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-300 group-hover:text-cyan transition-colors">{link.label}</div>
                <div className="text-sm text-slate-500 mt-0.5 font-mono">{link.value}</div>
              </div>
              <svg className="w-4 h-4 text-slate-700 group-hover:text-cyan ml-auto transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}

          <div className="p-5 rounded-xl bg-violet/5 border border-violet/15 mt-4">
            <p className="font-mono text-xs text-violet/60 tracking-widest mb-3">{t('contact.availableFor')}</p>
            <div className="space-y-2">
              {t('contact.availability').map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan shrink-0" />
                  <p className="text-sm text-slate-400">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Matrícula profesional COPNIA */}
          <div className="p-5 rounded-xl bg-cyan/[0.04] border border-cyan/20 mt-4 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-mono text-[10px] text-cyan/60 tracking-widest mb-1">{t('contact.copnia')}</p>
              <p className="text-sm font-semibold text-slate-200 mb-0.5">{t('contact.copniaDesc')}</p>
              <p className="font-mono text-xs text-slate-500">171122-0842239 VLL</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="form-label">{t('contact.form.name')}</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder={t('contact.form.namePlaceholder')} required className="form-input" />
          </div>
          <div>
            <label className="form-label">{t('contact.form.email')}</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder={t('contact.form.emailPlaceholder')} required className="form-input" />
          </div>
          <div>
            <label className="form-label">{t('contact.form.message')}</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder={t('contact.form.messagePlaceholder')} required className="form-input resize-none" />
          </div>
          <button type="submit" className="w-full btn-primary py-3.5 text-base">
            {status === 'sent' ? t('contact.form.sent') : t('contact.form.send')}
          </button>
          {status === 'sent' && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-sm text-cyan font-mono">
              {t('contact.form.confirm')}
            </motion.p>
          )}
        </form>
      </motion.div>
    </div>
  )
}
