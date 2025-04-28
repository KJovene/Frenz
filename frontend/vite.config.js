import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3030,
    proxy: {
      '/api': 'http://localhost:1337', // tout ce qui commence par /api est redirigé vers Strapi
    },
  },
  hmr: {
    protocol: 'ws',
    host: 'localhost',
  },
},)
