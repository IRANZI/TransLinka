module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#F2F6FA",
          100: "#E1EAF3",
          200: "#C5D5E6",
          300: "#9BB6D0",
          400: "#6B91B5",
          500: "#3D6A91",
          600: "#1E4D73",
          700: "#163A5C",
          800: "#0F2A45",
          900: "#0A1C30",
          950: "#06101C",
        },
      },
      fontFamily: {
        sans: ["var(--font-afacad)", "Afacad", "sans-serif"],
        heading: ["var(--font-afacad)", "Afacad", "sans-serif"],
      },
      fontSize: {
        xs: ["clamp(0.7rem, 0.65rem + 0.2vw, 0.75rem)", { lineHeight: "1.35" }],
        sm: ["clamp(0.8rem, 0.74rem + 0.28vw, 0.875rem)", { lineHeight: "1.5" }],
        base: ["clamp(0.9375rem, 0.86rem + 0.4vw, 1.0625rem)", { lineHeight: "1.6" }],
        lg: ["clamp(1.05rem, 0.95rem + 0.5vw, 1.2rem)", { lineHeight: "1.55" }],
        xl: ["clamp(1.2rem, 1.05rem + 0.7vw, 1.4rem)", { lineHeight: "1.4" }],
        "2xl": ["clamp(1.4rem, 1.15rem + 1vw, 1.75rem)", { lineHeight: "1.3" }],
        "3xl": ["clamp(1.7rem, 1.3rem + 1.6vw, 2.25rem)", { lineHeight: "1.2" }],
        "4xl": ["clamp(2rem, 1.45rem + 2.2vw, 2.85rem)", { lineHeight: "1.15" }],
        "5xl": ["clamp(2.35rem, 1.6rem + 3vw, 3.5rem)", { lineHeight: "1.1" }],
        "6xl": ["clamp(2.7rem, 1.7rem + 3.8vw, 4.25rem)", { lineHeight: "1.05" }],
        "7xl": ["clamp(3rem, 1.8rem + 4.6vw, 5rem)", { lineHeight: "1.02" }],
      },
      maxWidth: {
        content: "1680px",
      },
      boxShadow: {
        soft: "0 10px 40px -16px rgba(10, 28, 48, 0.18)",
        lift: "0 18px 50px -20px rgba(10, 28, 48, 0.28)",
      },
    },
  },
  plugins: [],
};
