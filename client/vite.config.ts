import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port:  3000,
  },
  define: {
    'import.meta.env.API_ENDPOINT': JSON.stringify('localhost:3001')// JSON.stringify(process.env.API_ENDPOINT),
  },
  plugins: [react()],
})