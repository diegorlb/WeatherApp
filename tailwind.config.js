const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#476D85',
        secondary: '#7190AD',
      },
      fontFamily: {
        open: ['"Open Sans"', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        xxs: ['0.65rem', '0.75rem']
      }
    },
  },
  plugins: [],
}
