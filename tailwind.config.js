/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      keyframes: {
        'bounce-in-right': {
          from: {
            opacity: 0,
            transform: 'translate3d(3000px, 0, 0)'
          },
          '60%': {
            opacity: 1,
            transform: 'translate3d(-25px, 0, 0)'
          },
          '75%': {
            transform: 'translate3d(10px, 0, 0)'
          },
          '90%': {
            transform: 'translate3d(-5px, 0, 0)'
          },
          to: {
            transform: 'none'
          }
        },
        'bounce-in-left': {
          '0%': {
            opacity: 0,
            transform: 'translate3d(-3000px, 0, 0)'
          },
          '60%': {
            opacity: 1,
            transform: 'translate3d(25px, 0, 0)'
          },
          '75%': {
            transform: 'translate3d(-10px, 0, 0)'
          },
          '90%': {
            transform: 'translate3d(5px, 0, 0)'
          },
          to: {
            transform: 'none'
          }
        },
        'bounce-in-up': {
          from: {
            opacity: 0,
            transform: 'translate3d(0, 3000px, 0)'
          },
          '60%': {
            opacity: 1,
            transform: 'translate3d(0, -20px, 0)'
          },
          '75%': {
            transform: 'translate3d(0, 10px, 0)'
          },
          '90%': {
            transform: 'translate3d(0, -5px, 0)'
          },
          to: {
            transform: 'translate3d(0, 0, 0)'
          }
        },
        'bounce-in-down': {
          '0%': {
            opacity: 0,
            transform: 'translate3d(0, -3000px, 0)'
          },
          '60%': {
            opacity: 1,
            transform: 'translate3d(0, 25px, 0)'
          },
          '75%': {
            transform: 'translate3d(0, -10px, 0)'
          },
          '90%': {
            transform: 'translate3d(0, 5px, 0)'
          },
          to: {
            transform: 'none'
          }
        },
        progress: {
          '0%': {
            transform: 'scaleX(1)'
          },
          '100%': {
            transform: 'scaleX(0)'
          }
        }
      },
      animation: {
        'bounce-in-right': 'bounce-in-right 0.7s linear',
        'bounce-in-left': 'bounce-in-left 0.7s linear',
        'bounce-in-up': 'bounce-in-up 0.7s linear',
        'bounce-in-down': 'bounce-in-down 0.7s linear',
        progress: 'progress linear 1 forwards'
      }
    }
  },
  plugins: [require('prettier-plugin-tailwindcss')]
}
