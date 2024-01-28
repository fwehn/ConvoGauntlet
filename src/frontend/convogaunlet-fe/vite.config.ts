import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/base-rest': {
        target: 'http://localhost:3000/',
        changeOrigin: false,
        secure: false,
        ws: false,
        rewrite: (path) => path.replace(/^\/base-rest/, ''),
      },
      '/base-ws': {
        target: 'http://localhost:3001/',
        changeOrigin: false,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/base-ws/, ''),
      }
    }
  }
})
