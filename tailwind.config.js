import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideRight: {
          from: { transform: 'translateX(80%)', opacity: 0 },
          to: { transform: 'translateX(0)', opacity: 1 },
        },
        slideLeft: {
          from: { transform: 'translateX(-80%)', opacity: 0 },
          to: { transform: 'translateX(0)', opacity: 1 },
        },
        slideDown: {
          from: { transform: 'translateY(300%)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 },
        },
        scaleUp: {
          from: { transform: 'scale(0.75)', opacity: 0 },
          to: { transform: 'scale(1)', opacity: 1 },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(-10%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
      },
      animation: {
        slideRight: 'slideRight 1s ease-in-out forwards',
        slideRight2: 'slideRight 0.5s ease-in-out forwards',
        slideLeft: 'slideLeft 1s ease-in-out forwards',
        slideDown: 'slideDown 1s ease-in-out forwards',
        scaleUp: 'scaleUp 1s ease-in-out forwards',
        scaleUp2: 'scaleUp 0.1s ease-in-out forwards',
        bounce: 'bounce 1s infinite',
      },
    },
  },
  plugins: [],
}
