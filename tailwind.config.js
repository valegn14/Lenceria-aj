/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        crema: "#F5F1D6",
        // Valores definidos como variables CSS en src/App.css
        header: {
          desde: "var(--header-fondo-desde)",
          hasta: "var(--header-fondo-hasta)",
          texto: "var(--header-texto)",
          marca: "var(--header-marca)",
          icono: "var(--header-icono)",
          acento: "var(--header-acento)",
          promo: "var(--header-promo-fondo)",
          franja: "var(--header-franja-fondo)",
        },
      },
      screens: {
        'xs': '475px',
        ...defaultTheme.screens,
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        entrarIzquierda: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.2s ease-out',
        fadeIn: 'fadeIn 0.15s ease-out',
        entrarIzquierda: 'entrarIzquierda 0.25s ease-out',
      },
    },
  },
  plugins: [],
}