/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      customFontEn: ['"Roboto"', "sans-serif"],
      customFontKr: ['"Noto Sans KR"', "sans-serif"],
    },
  },
  plugins: [],
};
