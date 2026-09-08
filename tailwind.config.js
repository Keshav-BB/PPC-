/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0C1B33',
          navyLight: '#162847',
          purple: '#6D28D9',
          purpleDark: '#581C87',
          pink: '#EC4899',
          pinkDark: '#BE185D',
          slate: '#334155',
          bgSoft: '#F8FAFC',
          accent: '#14B8A6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(12, 27, 51, 0.08)',
        hover: '0 12px 30px -4px rgba(12, 27, 51, 0.12)',
        glow: '0 0 25px rgba(236, 72, 153, 0.25)',
      }
    },
  },
  plugins: [],
};
