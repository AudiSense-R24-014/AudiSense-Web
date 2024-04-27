/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        audiSensePurple: '#6c26a6',
        audiSenseBlue: '#2379a4',
      },
    },
  },
  plugins: [
    ('@tailwindcss/forms'),
  ],
}