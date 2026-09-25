/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f8',
          100: '#d9e2f0',
          900: '#101828',
          950: '#0a1020',
        },
        teal: {
          400: '#2dd4bf',
          500: '#14B8A6',
          600: '#0d9488',
        },
        orange: {
          400: '#fb923c',
          500: '#F97316',
          600: '#ea6c0a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
