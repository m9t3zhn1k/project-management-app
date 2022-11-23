const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    colors: {
      'text-dark': '#0d062d',
      'text-dark-hover': '#6554b6',
      'text-grey': '#787486',
      'bg-grey': '#f5f5f5',
      'bg-blue-lilac': '#B8860B',
      'bg-blue-lilac-hover': '#c5a964',
      'bg-disabled': '#b4b4b4',
      'bg-dark': '#323232',
      'bg-light-gold': 'rgb(255 237 213)',
      'grey-light': '#e0e0e0',
      'white': '#ffffff',
      'green': '#7ac555',
      'orange': '#ffa500',
      'malva': '#e4ccfd',
      'light-blue': '#76a5ea',
      'caramel': '#d8727d',
      'red': '#c71616',
      'transparent': 'transparent',
      'dark-gold': '#e9cda6',
      'footer-grey': '#6b6662',
      'semi-grey': '#787486',
      'whitish': '#fff9',
      'backdrop': '#00000033',
      'pink': '#fdabaf',
    },
    fontFamily: {
      main: ['Inter', 'sans-serif'],
    },
    extend: {
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      minHeight: {
        inh: 'inherit',
      },
    },
    listStyleType: {
      square: 'square',
    }
  },
  plugins: [],
};
