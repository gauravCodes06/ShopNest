/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon: {
          dark: '#131921',
          lightDark: '#232f3e',
          hoverDark: '#37475a',
          bg: '#eaeded',
          yellow: '#ffd814',
          yellowHover: '#f7ca00',
          yellowBorder: '#fcd200',
          orange: '#ffa41c',
          orangeHover: '#fa8900',
          orangeBorder: '#ff8f00',
          amber: '#febd69',
          amberHover: '#f3a847',
          red: '#cc0c39',
          teal: '#007185',
          tealHover: '#c7511f',
          green: '#007600',
          star: '#de7921',
          border: '#d5d9d9',
          borderDark: '#888c8c',
          text: '#0f1111',
          muted: '#565959',
          prime: '#00a8e1',
        },
      },
      fontFamily: {
        sans: ['"Amazon Ember"', 'Inter', 'Segoe UI', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
