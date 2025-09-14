/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'primary': '#6B8E6B',
        'secondary': '#C7D6C9',
        'background': '#FFFDF8',
        'surface': '#FFFFFF',
        'text': '#2C2C2A',
        'accent': '#E08A6C',
      },
    },
  },
  plugins: [],
};