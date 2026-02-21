import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Custom domain - no base path needed
  build: {
    // Enable source maps for debugging (can be disabled in production)
    sourcemap: false, // Set to true for debugging, false for production
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split node_modules into separate chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('codemirror') || id.includes('@uiw')) {
              return 'code-editor';
            }
            if (id.includes('syntax-highlighter')) {
              return 'syntax-highlighter';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            // Other node_modules
            return 'vendor';
          }
          // Split data files into separate chunk
          if (id.includes('/data/')) {
            return 'data';
          }
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // Minification
    minify: 'esbuild',
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Target modern browsers for smaller bundle
    target: 'es2015',
    // Enable compression
    reportCompressedSize: true,
    // Reduce chunk size
    chunkSizeWarningLimit: 600
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})
