import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      components: path.resolve(__dirname, './src/components'),
      shared: path.resolve(__dirname, './src/shared'),
      stores: path.resolve(__dirname, './src/stores'),
      services: path.resolve(__dirname, './src/services'),

    }
  },
  plugins: [react()],
})
