/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Pilowlava', 'bold'],
        primary: ['Steps-Mono', 'monospace'],
        gloock: ['var(--gloock)', 'bold'],
      },
      boxShadow: {
        hard: '.2rem .2rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
