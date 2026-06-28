import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Custom domain - no base path needed
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.LOCAL_API_PORT || 8787}`,
        changeOrigin: true,
      },
      '/__/auth': {
        target: 'https://learnstackhub.firebaseapp.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    sourcemap: false,
    // Let Vite/Rollup decide chunking based on the real dependency graph.
    // Previous custom manualChunks created very large shared bundles on initial load.
    minify: 'esbuild',
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
    target: 'es2015',
    reportCompressedSize: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})
