/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        brand: {
          black: '#0D0D0D',
          onyx: '#1A1A1A',
          soot: '#262626',
          gray: '#333333',
          yellow: '#FFCC00',
          DEFAULT: '#1E6F9F',
          bright: '#4EA8DE',
          purple: '#8284FA',
          red: '#FF3B30',
          redish: '#FF3B3040',
          orange: '#FF9500',
          green: '#34C759',
          blue: '#007AFF',
          indigo: '#5856D6',
          violet: '#AF52DE',
          pink: '#FF2D55',
          brown: '#A2845E',
          salt: '#D9D9D9',
          offwhite: '#F2F2F2',
          white: '#FFFFFF',
          desaturated: '#808080',
        },
        border: 'hsl(0, 0%, 14.9%)',
        input: 'hsl(0, 0%, 14.9%)',
        ring: 'hsl(0, 0%, 83.1%)',
        background: 'hsl(215, 21%, 11%)',
        foreground: 'hsl(0, 0%, 98%)',
        primary: {
          DEFAULT: 'hsl(0, 0%, 98%)',
          foreground: 'hsl(0, 0%, 9%)',
        },
        secondary: {
          DEFAULT: 'hsl(0, 0%, 14.9%)',
          foreground: 'hsl(0, 0%, 98%)',
        },
        destructive: {
          DEFAULT: 'hsl(0, 62.8%, 30.6%)',
          foreground: 'hsl(0, 0%, 98%)',
        },
        muted: {
          DEFAULT: 'hsl(0, 0%, 14.9%)',
          foreground: 'hsl(0, 0%, 63.9%)',
        },
        accent: {
          DEFAULT: 'hsl(0, 0%, 14.9%)',
          foreground: 'hsl(0, 0%, 98%)',
        },
        popover: {
          DEFAULT: 'hsl(0, 0%, 3.9%)',
          foreground: 'hsl(0, 0%, 98%)',
        },
        card: {
          DEFAULT: 'hsl(216, 28%, 7%)',
          foreground: 'hsl(0, 0%, 98%)',
        },
        sidebar: {
          DEFAULT: 'hsl(240, 5.9%, 10%)',
          foreground: 'hsl(240, 4.8%, 95.9%)',
          primary: 'hsl(224.3, 76.3%, 48%)',
          'primary-foreground': 'hsl(0, 0%, 100%)',
          accent: 'hsl(240, 3.7%, 15.9%)',
          'accent-foreground': 'hsl(240, 4.8%, 95.9%)',
          border: 'hsl(240, 3.7%, 15.9%)',
          ring: 'hsl(217.2, 91.2%, 59.8%)',
        },
        chart: {
          1: 'hsl(220, 70%, 50%)',
          2: 'hsl(160, 60%, 45%)',
          3: 'hsl(30, 80%, 55%)',
          4: 'hsl(280, 65%, 60%)',
          5: 'hsl(340, 75%, 55%)',
        },
      },
      borderRadius: {
        lg: '2rem',
        md: 'calc(2rem - 2px)',
        sm: 'calc(2rem - 4px)',
      },
      margin: {
        backbutton: '91px 0 60px',
      },
      padding: {
        '6xl': '75px 0',
      },
      maxWidth: {
        '3xl': '736px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
