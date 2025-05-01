import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs existantes
        'brand-primary': '#6B46C1',
        'brand-secondary': '#ED64A6',
        'brand-background': '#F7FAFC',
        
        // Couleurs pour Frenz
        'accent': '#CCDF5E',
        'bg-dark': '#171717',
        'container-dark': '#272626',
        'text-light': '#FFFFFF',
      },
      fontFamily: {
        'baloo': ['Baloo 2', 'sans-serif'],
      },
      borderRadius: {
        'xl': '0.75rem',
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    logs: true,
    rtl: false,
  },
}