# 🚀 Portafolio Web – Ingeniero de Sistemas

Portafolio profesional construido con **React + Vite + Tailwind CSS + Framer Motion**.

---

## 📋 PASO 1 – Instalar prerrequisitos

### Node.js (OBLIGATORIO)
1. Ve a https://nodejs.org
2. Descarga la versión **LTS** (la recomendada, ej. 20.x o 22.x)
3. Instala el .exe o .pkg normalmente
4. Verifica en tu terminal:
```bash
node --version   # debe mostrar v20.x.x o superior
npm --version    # debe mostrar 10.x.x o superior
```

### VS Code (Editor recomendado)
1. Descarga en https://code.visualstudio.com
2. Instala las extensiones recomendadas:
   - **ES7+ React/Redux Snippets**
   - **Tailwind CSS IntelliSense**
   - **Prettier – Code formatter**

### Git (para subir a GitHub)
1. Descarga en https://git-scm.com
2. Instala con las opciones por defecto

---

## 📦 PASO 2 – Configurar el proyecto

```bash
# 1. Navega a la carpeta donde descargaste el proyecto
cd portfolio-ing-sistemas

# 2. Instala todas las dependencias (esto crea la carpeta node_modules)
npm install

# 3. Inicia el servidor de desarrollo
npm run dev
```

✅ Verás en consola: `Local: http://localhost:5173`  
Abre esa URL en tu navegador y verás tu portafolio en vivo.

---

## ✏️ PASO 3 – Personalizar el contenido

Busca el comentario `⚠️ PERSONALIZA` en estos archivos:

| Archivo                          | Qué cambiar                                    |
|----------------------------------|------------------------------------------------|
| `src/components/Hero.jsx`        | Tu nombre real, descripción personal           |
| `src/components/Experience.jsx`  | Tus fechas, empresas, logros reales            |
| `src/components/Projects.jsx`    | URLs de GitHub, demos de tus proyectos         |
| `src/components/Contact.jsx`     | Tu email, LinkedIn, GitHub reales              |
| `src/components/Footer.jsx`      | Tu nombre en el pie de página                  |

---

## 🌐 PASO 4 – Subir a GitHub

### Primera vez
```bash
# Inicializa Git en la carpeta del proyecto
git init

# Agrega todos los archivos
git add .

# Haz el primer commit
git commit -m "feat: portafolio inicial"
```

Luego en GitHub.com:
1. Crea una cuenta si no tienes
2. Haz clic en "New repository"
3. Nómbralo: `portafolio` (o como quieras)
4. No inicialices con README (ya tienes uno)
5. Copia los comandos que GitHub te muestra y ejecútalos en tu terminal

```bash
# Ejemplo (GitHub te dará tu URL real):
git remote add origin https://github.com/TU-USUARIO/portafolio.git
git branch -M main
git push -u origin main
```

---

## 🚀 PASO 5 – Desplegar gratis en Vercel

### Opción A – Vercel (recomendado, más rápido)
1. Ve a https://vercel.com y crea una cuenta con tu GitHub
2. Haz clic en **"New Project"**
3. Importa tu repositorio `portafolio`
4. Vercel detecta Vite automáticamente, no cambies nada
5. Haz clic en **"Deploy"**
6. En ~60 segundos tendrás tu URL: `https://portafolio-tu-usuario.vercel.app`

### Opción B – GitHub Pages
```bash
# Instala el plugin de GitHub Pages para Vite
npm install --save-dev gh-pages

# Agrega en vite.config.js:
# base: '/nombre-del-repo/'

# Construye y despliega
npm run build
npx gh-pages -d dist
```

---

## 📝 Comandos útiles

```bash
npm run dev      # Inicia servidor local en http://localhost:5173
npm run build    # Genera la carpeta dist/ lista para producción
npm run preview  # Previsualiza el build de producción localmente
```

---

## 🔄 Flujo de trabajo continuo

```bash
# Cuando hagas cambios y quieras actualizar Vercel:
git add .
git commit -m "feat: actualizo sección de proyectos"
git push origin main
# Vercel despliega automáticamente en segundos ✅
```

---

## 🗂️ Estructura del proyecto

```
portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx      # Navegación sticky
│   │   ├── Hero.jsx        # Sección principal
│   │   ├── Experience.jsx  # Línea de tiempo
│   │   ├── Projects.jsx    # Tarjetas de proyectos
│   │   ├── Skills.jsx      # Barras de habilidades
│   │   ├── Contact.jsx     # Formulario de contacto
│   │   └── Footer.jsx      # Pie de página
│   ├── App.jsx             # Componente raíz
│   ├── main.jsx            # Punto de entrada
│   └── index.css           # Estilos globales
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```
