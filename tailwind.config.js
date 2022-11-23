module.exports = {
  content: ["./src/**/*.{html,js}"],
  purge: [ './src/**/*.html', './src/**/*.vue', './src/**/*.jsx', ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'blue': 'rgb(var(--color-blue) / <alpha-value>)',
      'purple': 'rgb(var(--color-purple) / <alpha-value>)',
      'pink': 'rgb(var(--color-pink) / <alpha-value>)',
      'orange': 'rgb(var(--color-orange) / <alpha-value>)',
      'green': 'rgb(var(--color-green) / <alpha-value>)',
      'yellow': 'rgb(var(--color-yellow) / <alpha-value>)',
      'gray-dark': 'rgb(var(--color-gray-dark) / <alpha-value>)',
      'gray': 'rgb(var(--color-gray) / <alpha-value>)',
      'gray-light': 'rgb(var(--color-gray-light) / <alpha-value>)',
    },
    fontFamily: {
      sans: ['Barlow Condensed', 'sans-serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  }
}