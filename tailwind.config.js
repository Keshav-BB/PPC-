/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Executive Corporate Palette based on People Point identity
          navy: '#0F172A',         // Primary Dark (Text & Hero Contrast)
          navyLight: '#1E293B',    // Secondary Dark
          purple: '#581C87',       // Core Brand Purple ("People")
          purpleLight: '#7E22CE',  // Hover Purple
          purpleSoft: '#F5F3FF',   // Subtle Purple Background
          pink: '#E11D48',         // Vibrant Accent Pink ("Point")
          pinkDark: '#BE123C',     // Hover Pink
          pinkSoft: '#FFF1F2',     // Subtle Rose Background
          slate: '#475569',        // Body text slate (high legibility)
          slateLight: '#64748B',   // Secondary metadata
          bgSoft: '#F8FAFC',       // Clean background
          border: '#E2E8F0'        // Refined structural border
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['var(--font-heading)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        card: '0 2px 12px -2px rgba(15, 23, 42, 0.06), 0 1px 3px 0 rgba(15, 23, 42, 0.04)',
        hover: '0 10px 25px -4px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.05)',
        premium: '0 20px 40px -15px rgba(88, 28, 135, 0.15)',
      }
    },
  },
  plugins: [],
};
