export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5F0',
          100: '#FFEADC',
          200: '#FFD0AB',
          300: '#FFB47A',
          400: '#FF9248',
          500: '#FF7417', // Primary orange
          600: '#E35D00',
          700: '#B84B00',
          800: '#8C3900',
          900: '#612700',
        },
        secondary: {
          50: '#F7F8F2',
          100: '#EFF2E5',
          200: '#DFE6CC',
          300: '#CEDAB2',
          400: '#BECF99',
          500: '#ADC380', // Cardamom green
          600: '#8AAB4B',
          700: '#6A833A',
          800: '#4A5C28',
          900: '#2A3417',
        },
        accent: {
          50: '#FFFCF3',
          100: '#FFF9E6',
          200: '#FFF3CD',
          300: '#FFEDB3',
          400: '#FFE68A',
          500: '#FFDF71', // Turmeric yellow
          600: '#FFCB33',
          700: '#E6B000',
          800: '#B38700',
          900: '#805E00',
        },
        neutral: {
          50: '#F9F7F5',
          100: '#F3EFEB',
          200: '#E7DFD8',
          300: '#D9CFC4',
          400: '#CBBFB0',
          500: '#BEB09C', // Warm gray
          600: '#A38F77',
          700: '#86725D',
          800: '#685744',
          900: '#473C2E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}