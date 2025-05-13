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
        // Main theme colors based on the dark purple UI
        primary: '#6b21a8',
        secondary: '#9333ea',
        accent: '#c084fc',
        
        // Dark mode background colors
        'bg-dark': '#18181b',
        'container-dark': '#27272a',
        'sidebar-dark': '#2e1065',

        // Text colors
        'text-light': '#ffffff',
        'text-muted': '#a1a1aa',

        // Additional UI colors
        'hover-dark': '#3f3f46',
        'border-dark': '#3f3f46',

        // Custom light-green border color
        'lime-border': '#CCDF5E',
      },
      fontFamily: {
        baloo: ['Baloo 2', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        myDarkTheme: {
          primary: "#9333ea",
          secondary: "#c084fc",
          accent: "#d8b4fe",
          neutral: "#27272a",
          'base-100': "#18181b",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
      "light",
    ],
    darkTheme: "myDarkTheme",
    base: true,
    styled: true,
    utils: true,
    logs: false,
    rtl: false,
  },
}
