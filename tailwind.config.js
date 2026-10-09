/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#08080a',
          900: '#0b0b0e',
          800: '#111115',
          700: '#17171c',
        },
        fg: {
          DEFAULT: '#f4f4f5',
          2: '#a1a1aa',
          3: '#71717a',
          4: '#52525b',
        },
      },
    },
  },
  plugins: [],
};
