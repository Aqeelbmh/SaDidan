module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0f1c',
        surface: 'rgba(30,40,60,0.7)',
        neon: {
          green: '#39FF14',
          blue: '#00F0FF',
          cyan: '#00FFD0',
          magenta: '#FF00EA',
          yellow: '#F9FF00',
        },
        glass: 'rgba(255,255,255,0.12)',
        forest: '#234F1E', // Deep Forest Green
        moss: '#A3C585',   // Soft Moss Green
        earth: '#7C5E3C',  // Earth Brown
        sky: '#B3D8E7',    // Sky Blue
        leaf: '#6CBF84',   // Leaf Green
        offwhite: '#F5F7F2', // Off-White
        charcoal: '#222C22', // Charcoal
        gold: '#E6C200',   // Gold for awards
      },
      fontFamily: {
        sans: ['Inter', 'Nunito', 'Open Sans', 'sans-serif'],
      },
      backgroundImage: {
        'leaf-motif': "url('/leaf-motif.svg')",
        'tree-motif': "url('/tree-motif.svg')",
      },
      boxShadow: {
        neon: '0 0 16px 2px #39FF14, 0 0 32px 4px #00F0FF',
        glass: '0 4px 32px 0 rgba(0,0,0,0.25)',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        liquid: 'liquid 2s ease-in-out infinite',
        glow: 'glow 2s alternate infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        liquid: {
          '0%, 100%': { borderRadius: '50% 50% 50% 50%' },
          '50%': { borderRadius: '60% 40% 70% 30% / 30% 60% 40% 70%' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 16px 2px #39FF14, 0 0 32px 4px #00F0FF' },
          '50%': { boxShadow: '0 0 32px 8px #00FFD0, 0 0 64px 16px #FF00EA' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}; 