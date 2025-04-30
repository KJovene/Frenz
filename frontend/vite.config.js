import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3030,
    proxy: {
      '/api': 'http://localhost:1337', 
    },
  },
  hmr: {
    protocol: 'ws',
    host: 'localhost',
  },
},)
