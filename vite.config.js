import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Custom domain - no base path needed
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
