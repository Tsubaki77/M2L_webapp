import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // expose le serveur sur le réseau local (accessible depuis le téléphone via l'IP du PC)
  },
})
