/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        generalsans: ['Manrope', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        black: {
          DEFAULT: '#000',
          100: '#010103',
          200: '#0E0E10',
          300: '#1C1C21',
          500: '#3A3A49',
          600: '#1A1A1A',
        },
        white: {
          DEFAULT: '#FFFFFF',
          800: '#E4E4E6',
          700: '#D6D9E9',
          600: '#AFB0B6',
          500: '#62646C',
        },
        teal: {
          50: '#f0fdf4',
          600: '#0d9488',
          700: '#0f766e',
        },
        amber: {
          600: '#d97706',
          700: '#b45309',
        },
        slate: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          400: '#94a3b8',
        },
      },
      backgroundImage: {
        terminal: "url('/assets/terminal.png')",
        'gradient-premium': 'linear-gradient(135deg, #f7f2e9 0%, #efe5d8 100%)',
        'gradient-accent': 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        'card': '0 10px 40px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 20px 50px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
};
