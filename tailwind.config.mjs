/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Coastal Calm palette — see docs/04-design-system.md
        lagoon: {
          500: '#2B7A87',
          600: '#1E5F6B',
          700: '#0F3D47',
        },
        seafoam: {
          100: '#E8F1EF',
          200: '#C9DEDA',
        },
        mist: '#F7F9F8',
        paper: '#FFFFFF',
        ink: '#1A2A2D',
        slate: {
          DEFAULT: '#5A6B6E',
          light: '#8FA0A3',
        },
        line: '#E2E8E7',
        brass: {
          500: '#A8845C',
          600: '#9A6E45',
        },
        coral: '#D87158',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.375rem',
        lg: '0.5rem',
      },
      maxWidth: {
        content: '1280px',
        bleed: '1600px',
        prose: '65ch',
      },
    },
  },
  plugins: [],
};
