import type { Config } from 'tailwindcss'
const { colors, typography } = require('./config/theme')

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        mobile: '480px',
        tablet: '768px',
        desktop: '1280px'
      },
      colors: {
        ...colors,
        primary: colors.gray[800],
        secondary: colors.gray[600],
        tertiary: colors.gray[400],
        disabled: colors.gray[200]
      },
      backgroundColor: {
        'surface-soft': colors.gray[100],
        'surface-medium': colors.gray[200],
        'surface-hard': colors.gray[500],
        button: colors.gray[900],
        'button-secondary': colors.gray[100],
        tab: colors.gray[0]
      },
      borderColor: {
        primary: colors.gray[800],
        secondary: colors.gray[600],
        tertiary: colors.gray[400],
        disabled: colors.gray[200],
        surfacehard: colors.gray[500],
      },
      fontSize: {
        ...typography
      }
    }
  },
  plugins: [require('flowbite/plugin')],
}
export default config
