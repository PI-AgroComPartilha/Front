/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{jsx,js,ts,tsx}"
  ],
  extend: {
    theme: {
      colors: {
        'verde-escuro': '#386641',
        'verde-mato-escuro': '#587D33',
        'verde-claro': '#A7C957',
        'laranja-acizentado-claro': '#F2E8CF',
        'vermelho': '#BC4749',
        'verde-escuro-azulado': '#0A6847',
        'verde-limao-medio': '#7ABA78',
        'trigo': '#F6E9B2',
        'bronze': '#F3CA52',
        'branco': '#ffffff'
      },
    },
  },
  plugins: [],
}

