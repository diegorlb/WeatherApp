const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#15171d',
        secondary: '#252833',
      },
      fontFamily: {
        open: ['"Open Sans"', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}
