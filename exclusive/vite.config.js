import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Enables listening on all addresses (0.0.0.0)
    port: 3000, // Specify a custom port if needed (default is 5173)
  },
})
