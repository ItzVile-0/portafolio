// ─────────────────────────────────────────────────────────────────────────────
// App.jsx  —  Componente raíz de la aplicación
// Orquesta la estructura general: Header fijo + secciones + Footer.
// También define los elementos decorativos de fondo (grid, orbs de luz).
// ─────────────────────────────────────────────────────────────────────────────

import Header     from './components/Header'
import Hero       from './components/Hero'
import Experience from './components/Experience'
import Projects   from './components/Projects'
import Skills     from './components/Skills'
import Contact    from './components/Contact'
import Footer     from './components/Footer'

export default function App() {
  return (
    // Contenedor principal: fondo oscuro, altura mínima de pantalla completa
    // La clase "noise" agrega una textura de ruido sutil (definida en index.css)
    <div className="relative bg-[#070712] min-h-screen noise">

      {/* ── Fondo decorativo: grid de líneas sutiles ── */}
      {/* pointer-events-none: el grid no interfiere con clics del usuario */}
      <div className="fixed inset-0 grid-bg opacity-100 pointer-events-none" />

      {/* ── Orb de luz cian — esquina superior izquierda ── */}
      {/* Crea un resplandor ambiental que da profundidad a la página */}
      <div className="orb w-[600px] h-[600px] bg-cyan/5 top-0 -left-40 fixed" />

      {/* ── Orb de luz violeta — lado derecho del centro ── */}
      <div className="orb w-[400px] h-[400px] bg-violet/5 top-1/2 -right-40 fixed" />

      {/* ── Contenido principal (encima del fondo) ── */}
      {/* z-10 asegura que el contenido quede sobre los elementos decorativos */}
      <div className="relative z-10">

        {/* Header fijo con navegación — se mantiene visible al hacer scroll */}
        <Header />

        <main>
          {/* Cada sección tiene un id para el scroll de navegación */}
          <section id="hero">        <Hero />       </section>
          <section id="experiencia"> <Experience /> </section>
          <section id="proyectos">   <Projects />   </section>
          <section id="skills">      <Skills />     </section>
          <section id="contacto">    <Contact />    </section>
        </main>

        {/* Pie de página con datos de contacto mínimos */}
        <Footer />
      </div>
    </div>
  )
}
