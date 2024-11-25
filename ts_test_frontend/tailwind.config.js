/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        tsPrimaryBlue: '#1698D5',
        tsDarkBg: '#1B1933',
      },
      fontFamily: {
        "rubik": ["Rubik", "serif"],
      },
    },
  },
  plugins: [],
};
