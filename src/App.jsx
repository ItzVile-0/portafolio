// ─────────────────────────────────────────────────────────────────────────────
// App.jsx  —  Componente raíz de la aplicación
// Orquesta la estructura general: Header fijo + secciones + Footer.
// Incluye barra de progreso de scroll, botón "volver arriba" y un
// enlace de accesibilidad para saltar directo al contenido.
// ─────────────────────────────────────────────────────────────────────────────

import Header         from './components/Header'
import Hero           from './components/Hero'
import About          from './components/About'
import Experience     from './components/Experience'
import Projects       from './components/Projects'
import Skills         from './components/Skills'
import Contact        from './components/Contact'
import Footer         from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import { useLang }    from './i18n/LanguageContext'

export default function App() {
  const { lang } = useLang()
  const skipLabel = lang === 'en' ? 'Skip to content' : 'Saltar al contenido'

  return (
    <div className="relative bg-[#070712] min-h-screen noise overflow-x-hidden">

      {/* ── Enlace de accesibilidad: salta al contenido (visible solo al tabular) ──
          Permite a usuarios de teclado/lectores de pantalla saltarse la
          navegación e ir directo al contenido principal. */}
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]
                   focus:px-4 focus:py-2 focus:rounded-lg focus:bg-cyan focus:text-[#070712]
                   focus:font-semibold focus:text-sm focus:outline-none"
      >
        {skipLabel}
      </a>

      {/* Barra de progreso de scroll + botón volver arriba */}
      <ScrollProgress />

      {/* ── Fondo decorativo: grid + orbs de luz ── */}
      {/* aria-hidden: son puramente decorativos, los lectores de pantalla los ignoran */}
      <div className="fixed inset-0 grid-bg opacity-100 pointer-events-none" aria-hidden="true" />
      <div className="orb w-[600px] h-[600px] bg-cyan/5 top-0 -left-40 fixed" aria-hidden="true" />
      <div className="orb w-[400px] h-[400px] bg-violet/5 top-1/2 -right-40 fixed" aria-hidden="true" />

      {/* ── Contenido principal ── */}
      <div className="relative z-10">
        <Header />

        {/* id="contenido" es el destino del enlace "saltar al contenido" */}
        <main id="contenido">
          <section id="hero">        <Hero />       </section>
          <section id="sobre-mi">    <About />      </section>
          <section id="experiencia"> <Experience /> </section>
          <section id="proyectos">   <Projects />   </section>
          <section id="skills">      <Skills />     </section>
          <section id="contacto">    <Contact />    </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}
