/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': { 'min': '0px', 'max': '500px' },
      'sm': '500px',
      '2sm': '575px',
      'md': '640px',
      'lg': '766px',
      '2lg': '900px',
      'xl': '1024px',
      '2xl': '1280px',
    },
    extend: {
      colors: {
        'background-primary': '#161d29',
        'background-secondary': '#2b384e',
        'background-tertiary': '#1f2836',
        'primary-border': 'rgba(164,230,255,.2)',
        'background': '#303030',
        'primary-icon': '#ffffffcc',
        'primary-text': '#ffffffcc',
        'primary-text2': '#ffffffa6',

        'primary-login': '#0078e1',
        'primary': '#2b384e',
        'subscribe': 'rgb(239,68,68)',
      },
      keyframes: {
        right: {
          '0%': { transform: 'translateX(-140%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        right2: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        left: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        right: 'right .5s linear forwards',
        right2: 'right2 .5s ease-in-out forwards',
        left: 'left 0.3s linear forwards',
      },
    },
    plugins: [],
  }
}