/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        vellum: '#F5ECD7',
        'vellum-deep': '#EDE0C4',
        tan: '#D4C4A8',
        'tan-deep': '#C4B090',
        'tan-deeper': '#C8B898',
        ink: '#2E2A25',
        'ink-mid': '#4A443C',
        'ink-light': '#7A7168',
        rust: '#A0522D',
        'rust-light': '#C4693A',
        'rust-pale': '#E8C9B0',
        cream: '#FAF6EE',
      },
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '0.88' }],
        '9xl': ['8rem', { lineHeight: '0.9' }],
      },
      letterSpacing: {
        memoir: '0.18em',
      },
      borderRadius: {
        'photo': '2px',
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(46,42,37,0.12)',
        'warm-md': '0 6px 20px rgba(46,42,37,0.14)',
        'warm-lg': '0 12px 40px rgba(46,42,37,0.18)',
      },
      backgroundImage: {
        'page-depth': 'linear-gradient(to bottom, #FAF6EE 0%, #F5ECD7 15%, #EDE0C4 40%, #E2D4B4 65%, #D4C4A8 85%, #C8B898 100%)',
      },
      animation: {
        'chevron': 'pulseChevron 2.4s cubic-bezier(0.45,0,0.55,1) infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
      },
      transitionTimingFunction: {
        'memoir': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};