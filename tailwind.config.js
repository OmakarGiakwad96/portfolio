/** @type {import('tailwindcss').Config} */
// Colors are CSS variables (see src/app/globals.css) so the palette lives in one place.
const withAlpha = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: withAlpha('bg'),
        surface: withAlpha('surface'),
        elevated: withAlpha('elevated'),
        line: withAlpha('line'),
        ink: withAlpha('ink'),
        muted: withAlpha('muted'),
        accent: withAlpha('accent'),
        'accent-ink': withAlpha('accent-ink'),
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        container: '76rem',
      },
    },
  },
  plugins: [],
};
