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
          // Split data files by course for better code splitting
          if (id.includes('/data/corejava/')) {
            return 'data-corejava';
          }
          if (id.includes('/data/html/')) {
            return 'data-html';
          }
          if (id.includes('/data/css/')) {
            return 'data-css';
          }
          if (id.includes('/data/jdbc/')) {
            return 'data-jdbc';
          }
          if (id.includes('/data/servlets/')) {
            return 'data-servlets';
          }
          if (id.includes('/data/jsp/')) {
            return 'data-jsp';
          }
          if (id.includes('/data/hibernate/')) {
            return 'data-hibernate';
          }
          if (id.includes('/data/mysql/')) {
            return 'data-mysql';
          }
          if (id.includes('/data/git/')) {
            return 'data-git';
          }
          if (id.includes('/data/maven/')) {
            return 'data-maven';
          }
          if (id.includes('/data/spring/')) {
            return 'data-spring';
          }
          // Other data files
          if (id.includes('/data/')) {
            return 'data-other';
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
    chunkSizeWarningLimit: 600,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Target modern browsers for smaller bundle
    target: 'es2015',
    // Enable compression
    reportCompressedSize: true
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})
