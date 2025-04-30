import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#6B46C1',
        'brand-secondary': '#ED64A6',
        'brand-background': '#F7FAFC',
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dark"],      // فقط تم تاریک فعال است
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    logs: true,
    rtl: false,
  },
}
