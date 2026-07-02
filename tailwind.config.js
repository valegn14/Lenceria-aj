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
      },
      animation: {
        slideDown: 'slideDown 0.2s ease-out',
        fadeIn: 'fadeIn 0.15s ease-out',
      },
    },
  },
  plugins: [],
}