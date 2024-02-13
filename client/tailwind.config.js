/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        blackLight: '#00000060',
        green: '#04C600',
        orange: '#FF7A00',
      },
    },
  },
  plugins: [],
};
