import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10b981', // Green for agriculture
        secondary: '#f59e0b', // Amber for harvest
        accent: '#3b82f6', // Blue for water/info
        neutral: '#6b7280', // Gray for secondary text
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        'light-bg': '#f9fafb',
        'dark-bg': '#111827',
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      spacing: {
        safe: 'max(1rem, env(safe-area-inset-bottom))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
