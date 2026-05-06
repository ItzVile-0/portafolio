/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: { DEFAULT: '#00d4ff', dark: '#00a8cc' },
        violet: { DEFAULT: '#6c63ff', dark: '#5a52d5' },
        dark: {
          bg: '#070712',
          surface: '#0d0d1f',
          card: '#111128',
          border: '#1e1e3a',
        }
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'blink': 'blink 1s step-end infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 212, 255, 0.3)' },
          '50%': { boxShadow: '0 0 0 8px rgba(0, 212, 255, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
