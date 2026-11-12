import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: 'var(--c-dark)',
          light: 'var(--c-light)',
          accent: 'var(--c-accent)',
          glow: 'var(--c-glow)'
        },
        nebula: {
          primary: 'var(--c-primary)',
          secondary: 'var(--c-secondary)',
          tertiary: 'var(--c-tertiary)'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'space-grid': 'linear-gradient(to right, color-mix(in srgb, var(--c-secondary) 10%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--c-secondary) 10%, transparent) 1px, transparent 1px)',
        'nebula-glow': 'radial-gradient(circle at center, color-mix(in srgb, var(--c-secondary) 20%, transparent) 0%, transparent 70%)'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 8s ease-in-out infinite'
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' }
        }
      }
    },
  },
  plugins: [],
}

export default config