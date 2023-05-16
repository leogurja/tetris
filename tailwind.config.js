/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.jsx', './index.html'],
  theme: {
    extend: {
      colors: {
        accent: '#78aeed',
        accentBg: '#3584e4',
        destructive: '#ff7b63',
        destructiveBg: '#c01c28',
        success: '#8ff0a4',
        successBg: '#26a269',
        warning: '#f8e45c',
        warningBg: '#cd9309',
        background: '#242424',
        foreground: '#ffffff',
        viewBg: '#1e1e1e',
        headerBg: '#303030',
        headerBackdrop: '#242424',
        dialogBg: '#383838',
        shadow: '#0000005c'
      },
      fontFamily: {
        sans: ['Cantarell', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

