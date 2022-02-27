const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#546987',
        secondary: '#0A5071',
      },
      fontFamily: {
        open: ['"Open Sans"', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        xxs: ['0.65rem', '0.75rem']
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
