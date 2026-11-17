import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/portfolio/' : '/',
  plugins: [
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.glb'],
  build: {
    rollupOptions: {
      output: {
        // Long-lived vendor chunks so a content update doesn't bust the library cache
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['motion', 'motion/react'],
        },
      },
    },
  },
}))
