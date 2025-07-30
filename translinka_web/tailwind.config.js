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
      sm: '1.125rem',      
      base: '1.375rem',    
      lg: '1.5rem',        
      xl: '1.75rem',    
      '2xl': '2.125rem', 
      '3xl': '2.625rem',   
      '4xl': '3.25rem',    
      '5xl': '4rem',      
      '6xl': '4.875rem',   
      '7xl': '5.75rem',    
    },
  },
  plugins: [],
};
