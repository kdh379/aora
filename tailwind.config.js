/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#161622",
        secondary: {
          DEFAULT: "#FF9C01",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        thin: ["Pretendard-Thin", "sans-serif"],
        extralight: ["Pretendard-ExtraLight", "sans-serif"],
        light: ["Pretendard-Light", "sans-serif"],
        regular: ["Pretendard-Regular", "sans-serif"],
        medium: ["Pretendard-Medium", "sans-serif"],
        semibold: ["Pretendard-SemiBold", "sans-serif"],
        bold: ["Pretendard-Bold", "sans-serif"],
        extrabold: ["Pretendard-ExtraBold", "sans-serif"],
        black: ["Pretendard-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};