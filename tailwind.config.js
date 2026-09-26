/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shopnest: {
          navy:        '#0B1222',
          navyCard:    '#151F35',
          slate:       '#1E293B',
          muted:       '#64748B',
          lightMuted:  '#94A3B8',
          sage:        '#059669',
          sageDark:    '#047857',
          sageHover:   '#065F46',
          sageLight:   '#ECFDF5',
          sageBorder:  '#A7F3D0',
          orange:      '#F97316',
          orangeHover: '#EA580C',
          orangeLight: '#FFF7ED',
          bg:          '#F5F6F8',
          bgAlt:       '#EEF0F4',
          border:      '#E2E8F0',
          borderLight: '#F1F5F9',
          card:        '#FFFFFF',
          textPrimary: '#0F172A',
          textSecond:  '#334155',
          textMuted:   '#64748B',
          textFaint:   '#94A3B8',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code"', '"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight:   '-0.02em',
        snug:    '-0.01em',
      },
      boxShadow: {
        'xs':         '0 1px 2px 0 rgba(0,0,0,0.04)',
        'subtle':     '0 1px 3px 0 rgba(0,0,0,0.05), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'card':       '0 2px 8px -2px rgba(0,0,0,0.06), 0 1px 3px -1px rgba(0,0,0,0.05)',
        'card-hover': '0 12px 24px -6px rgba(0,0,0,0.1), 0 4px 8px -4px rgba(0,0,0,0.06)',
        'panel':      '0 4px 24px -4px rgba(0,0,0,0.08), 0 2px 8px -2px rgba(0,0,0,0.05)',
        'lift':       '0 20px 40px -10px rgba(0,0,0,0.12), 0 8px 16px -8px rgba(0,0,0,0.08)',
        'sage':       '0 4px 14px 0 rgba(5,150,105,0.25)',
        'orange':     '0 4px 14px 0 rgba(249,115,22,0.25)',
        'inner-light':'inset 0 1px 2px rgba(255,255,255,0.9)',
        'ring-sage':  '0 0 0 3px rgba(5,150,105,0.15)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer':         'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
      },
      animation: {
        'fade-up':    'fadeSlideUp 0.35s ease both',
        'fade-in':    'fadeIn 0.25s ease both',
        'scale-in':   'scaleIn 0.2s ease both',
        'shimmer':    'shimmer 1.6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2s ease-in-out infinite',
        'slide-left': 'slideLeft 0.3s ease both',
      },
      keyframes: {
        fadeSlideUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-600px 0' },
          '100%': { backgroundPosition: '600px 0' },
        },
        'pulse-ring': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(5,150,105,0.35)' },
          '50%':      { boxShadow: '0 0 0 6px rgba(5,150,105,0)' },
        },
        slideLeft: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
