module.exports = {
  darkMode: "class",
   content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
    },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
