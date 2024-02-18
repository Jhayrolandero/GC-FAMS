/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        blue: "#074287",
        green: "#27AE60",
        greenBar: "#1E7242",
        white2: "#F1F1F1",
        lightGreen: "#27AE60",
      },
      fontFamily: {
        Montserrat: ["Montserrat"],
      },
      screens: {
        mobileS: "320px",
        mobileM: "375px",
        mobileL: "420px",
        tablet: "768px",
        laptop: "1024px",
        desktop: "1280px",
        laptopL: "1440px",
        fourk: "2560px",
      },
    },
  },
  plugins: [],
};
