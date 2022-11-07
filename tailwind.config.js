module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    colors: {
      'text-dark': '#0d062d',
      'text-dark-hover': '#6554b6',
      'text-grey': '#787486',
      'bg-grey': '#f5f5f5',
      'bg-blue-lilac': '#5030e5',
      'bg-blue-lilac-hover': '#6d53dd',
      'bg-disabled': '#b4b4b4',
      'white': '#ffffff',
      'green': '#7ac555',
      'orange': '#ffa500',
      'malva': '#e4ccfd',
      'light-blue': '#76a5ea',
      'caramel': '#d8727d',
      'red': '#c71616',
      'transparent': 'transparent',
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
  },
  plugins: [],
}
