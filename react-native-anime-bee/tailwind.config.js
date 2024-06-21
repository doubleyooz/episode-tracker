module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xxs: "360px",
      xs: "480px",
    },
    extend: {
      colors: {
        primary: {
          50: "#fffcea",
          100: "#fff5c5",
          200: "#ffeb85",
          300: "#ffda46",
          400: "#ffc71b",
          500: "#ffa500", // default
          600: "#e27c00",
          700: "#bb5502",
          800: "#984208",
          900: "#7c360b",
          950: "#481a00",
        },

        secondary: {
          50: "#f7f8f7",
          100: "#efefef",
          200: "#dfe0df", // default
          300: "#bbbebb",
          400: "#969a96",
          500: "#7a7d7a",
          600: "#636663",
          700: "#515351",
          800: "#454745",
          900: "#3c3e3c",
          950: "#282928",
        },

        error: {
          50: "#fef2f2",
          100: "#fde3e3",
          200: "#fccccc",
          300: "#f9a8a9",
          400: "#f37677",
          500: "#e9494a", // default
          600: "#d62c2d",
          700: "#b42122",
          800: "#951f20",
          900: "#7c2021",
          950: "#430c0c",
        },
      },
    },
  },
  plugins: [],
};
