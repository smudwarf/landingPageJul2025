/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'orange-bg': 'var(--color-orange-bg)',
        'orange-inc': 'var(--color-orange-inc)',
        'blue-bg': 'var(--color-blue-bg)',
        'blue-inc': 'var(--color-blue-inc)',
        'yellow-bg': 'var(--color-yellow-bg)',
        'yellow-inc': 'var(--color-yellow-inc)',
        'green-bg': 'var(--color-green-bg)',
        'green-inc': 'var(--color-green-inc)',
      },
      fontSize: {
        'heading-md': ['var(--text-heading-md)', {
          lineHeight: 'var(--text-heading-md--line-height)',
          fontWeight: 'var(--text-heading-md--font-weight)',
          letterSpacing: 'var(--text-heading-md--letter-spacing)',
        }],
        'title-md': ['var(--text-title-md)', {
          lineHeight: 'var(--text-title-md--line-height)',
          fontWeight: 'var(--text-title-md--font-weight)',
          letterSpacing: 'var(--text-title-md--letter-spacing)',
        }],
        'body-md': ['var(--text-body-md)', {
          lineHeight: 'var(--text-body-md--line-height)',
          fontWeight: 'var(--text-body-md--font-weight)',
          letterSpacing: 'var(--text-body-md--letter-spacing)',
        }],
        'body-sm': ['var(--text-body-sm)', {
          lineHeight: 'var(--text-body-sm--line-height)',
          fontWeight: 'var(--text-body-sm--font-weight)',
          letterSpacing: 'var(--text-body-sm--letter-spacing)',
        }],
        'btn-lg': ['var(--text-btn-lg)', {
          lineHeight: 'var(--text-btn-lg--line-height)',
          fontWeight: 'var(--text-btn-lg--font-weight)',
          letterSpacing: 'var(--text-btn-lg--letter-spacing)',
        }],
        'btn-sm': ['var(--text-btn-sm)', {
          lineHeight: 'var(--text-btn-sm--line-height)',
          fontWeight: 'var(--text-btn-sm--font-weight)',
          letterSpacing: 'var(--text-btn-sm--letter-spacing)',
        }],
      }
    },
  },
  plugins: [],
}