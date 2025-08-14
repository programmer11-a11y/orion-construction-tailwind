/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./layouts/**/*.{html,js}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      lg: "992px",
      // => @media (min-width: 991px) { ... }
      xl: "1199px",
      // => @media (min-width: 1170px) { ... }
      "1xl": "1380px",
      // => @media (min-width: 1330px) { ... }
      "2xl": "1752px",
      // => @media (min-width: 1720px) { ... }
    },
    colors: {
      black: "#000000",
      white: "#ffffff",
      transparent: "transparent",

      primary: {
        800: "#083631",
        900: "#186F65",
      },
      gray: {
        100: "#EFEFEF",
        200: "#F5F6F6",
        300: "#F2F2F2",
        400: "#464343",
      },
      yellow: {
        900: "#FFB038",
      },
      red: {
        600: "#E87676",
      },
      dark: {
        400: "#4E4E4E",
      },
    },
    extend: {
      fontFamily: {
        "el-messiri": [
          "El Messiri",
          "sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        lexend: [
          "Lexend",
          "sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },

      fontSize: {
        "1xl": "20px",
        "2xl": "22px",
        "3xl": "30px",
        "4xl": "40px",
        "5xl": "60px",
        "6xl": "75px",
        md: "16px",
      },
      lineHeight: {
        md: "26px",
        xl: "32px",
        "1xl": "28px",
        "2xl": "32px",
        "3xl": "34px",
        "4xl": "50px",
        "5xl": "70px",
        "6xl": "85px",
      },

      spacing: {
        full: "100%",
      },
      boxShadow: {
        card: "0px 4px 9px rgba(0, 0, 0, 0.12)",
        box: "0px 4px 4px rgba(25, 13, 31, 0.1)",
        input: "0px 2px 8px 0px rgba(25, 13, 31, 0.12)",
      },
      borderRadius: {
        "7xl": "50px",
        "6xl": "40px",
        "5xl": "30px",
        "4xl": "20px",
        "2xl": "15px",
        "1xl": "12px",
        xl: "10px",
      },
      margin: {
        auto: "auto",
      },
      zIndex: {
        "-1": "-1",
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
      },
      height: {
        "100vw": "100vw",
      },
      content: {},
      transitionDuration: {
        0: "0ms",
        3000: "3000ms",
      },
      keyframes: {
        slides: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        slides: "slides 17s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
