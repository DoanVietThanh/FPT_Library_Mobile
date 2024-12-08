/* eslint-disable no-undef */
const { hairlineWidth } = require('nativewind/theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          100: 'hsl(var(--success-100))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          100: 'hsl(var(--info-100))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          100: 'hsl(var(--warning-100))',
        },
        danger: {
          DEFAULT: 'hsl(var(--danger))',
          100: 'hsl(var(--danger-100))',
        },
        draft: {
          DEFAULT: 'hsl(var(--draft))',
          100: 'hsl(var(--draft-100))',
        },
        progress: {
          DEFAULT: 'hsl(var(--progress))',
          100: 'hsl(var(--progress-100))',
        },
        'status-foreground': {
          DEFAULT: 'hsl(var(--status-foreground))',
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [],
}
