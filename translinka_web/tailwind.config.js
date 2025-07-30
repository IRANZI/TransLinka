module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
  fontFamily: {
    sans: ['Inter', 'sans-serif'],
    heading: ['Poppins', 'sans-serif'],
  },
},

    fontSize: {
      'xs': ['0.9rem', { lineHeight: '1.4rem' }],
      'sm': ['1rem', { lineHeight: '1.6rem' }],
      'base': ['1.15rem', { lineHeight: '1.8rem' }],
      'lg': ['1.3rem', { lineHeight: '1.9rem' }],
      'xl': ['1.5rem', { lineHeight: '2.1rem' }],
      '2xl': ['1.75rem', { lineHeight: '2.3rem' }],
      '3xl': ['2.1rem', { lineHeight: '2.6rem' }],
      '4xl': ['2.6rem', { lineHeight: '3rem' }],
      '5xl': ['3.2rem', { lineHeight: '1.1' }],
      '6xl': ['4rem', { lineHeight: '1.1' }],
      '7xl': ['5rem', { lineHeight: '1.1' }],
    },
  },
  plugins: [],
};
