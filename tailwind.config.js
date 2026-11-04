/** @type {import('tailwindcss').Config} */

// Colours come from CSS variables (RGB triplets in index.css) so they're defined once and every
// utility still takes an alpha: bg-surface/80, border-line/[0.08], text-fg-2…
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

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
        ink: v('bg-rgb'), // page background
        surface: v('surface-rgb'), // panels and glass
        line: v('line-rgb'), // hairlines and veils
        accent: v('accent-rgb'), // cosmic blue
        accent2: v('accent2-rgb'), // nebula cyan
        ok: v('ok-rgb'), // "available" green
        fg: {
          DEFAULT: v('fg-rgb'),
          2: v('fg2-rgb'),
          3: v('fg3-rgb'),
          4: v('fg4-rgb'),
        },
      },
    },
  },
  plugins: [],
};
