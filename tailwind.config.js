/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor:{
        'white-variant-font': '#EEE5D3'
      },
      fontFamily: {
        'kutob': ['KutobFont', 'sans-serif'],
        'metaltext': ['MetalMania', 'sans-serif']
      },
      backgroundImage: {
        'register-bg': "url('../src/assets/Card_BG_Loading_1.png')",
        'day-bg': "url('../src/assets/BACKGROUND_DAY.jpg')",
        'night-bg': "url('../src/assets/BACKGROUND_NIGHT.jpg')",
        'lobby-bg': "url('../src/assets/Loading_Screen_1.png')"
      }
    },
  },
  plugins: [],
}

