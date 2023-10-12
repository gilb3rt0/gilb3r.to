/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Pilowlava', 'bold'],
        primary: ['Steps-Mono', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
