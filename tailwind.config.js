/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        mainGray: "#C0C0C0",
        blue: "#074287",
        green: "#27AE60",
        greenBar: "#1E7242",
        white2: "#F1F1F1",
        lightGreen: "#27AE60",
        formBlue: "#e8f0fe",
        formGrey: "#F8F8F8",
      },
      fontFamily: {
        Montserrat: ["Montserrat"],
        Poppins: ["Poppins"],
        Roboto: ["Roboto"],
        Inter: ["Inter"],
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
      boxShadow: {
        main: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
