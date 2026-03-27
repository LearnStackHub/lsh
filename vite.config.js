import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Custom domain - no base path needed
  build: {
    sourcemap: false,
    // Aggressive code splitting
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
            if (
              id.includes('react-syntax-highlighter') ||
              id.includes('syntax-highlighter') ||
              id.includes('highlight.js') ||
              id.includes('refractor') ||
              id.includes('prismjs')
            ) {
              return 'syntax-highlighter';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            if (id.includes('@emailjs')) {
              return 'emailjs';
            }
            return 'vendor';
          }
          // Split data files by course - CRITICAL for performance
          if (id.includes('/data/corejava/basics/')) {
            return 'data-corejava-basics';
          }
          if (id.includes('/data/corejava/controlflow/')) {
            return 'data-corejava-controlflow';
          }
          if (id.includes('/data/corejava/oops/')) {
            return 'data-corejava-oops';
          }
          if (id.includes('/data/corejava/strings/')) {
            return 'data-corejava-strings';
          }
          if (id.includes('/data/corejava/arrays/')) {
            return 'data-corejava-arrays';
          }
          if (id.includes('/data/corejava/exceptions/')) {
            return 'data-corejava-exceptions';
          }
          if (id.includes('/data/corejava/collections/')) {
            return 'data-corejava-collections';
          }
          if (id.includes('/data/corejava/advanced/')) {
            return 'data-corejava-advanced';
          }
          if (id.includes('/data/corejava/multithreading/')) {
            return 'data-corejava-multithreading';
          }
          if (id.includes('/data/corejava/interview/')) {
            return 'data-corejava-interview';
          }
          if (id.includes('/data/corejava/')) {
            return 'data-corejava';
          }
          if (id.includes('/data/html/')) {
            return 'data-html';
          }
          if (id.includes('/data/css/')) {
            return 'data-css';
          }
          if (id.includes('/data/http/')) {
            return 'data-http';
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
          if (id.includes('/data/springboot/')) {
            return 'data-springboot';
          }
          if (id.includes('/data/springcloud/')) {
            return 'data-springcloud';
          }
          if (id.includes('/data/sdlc/')) {
            return 'data-sdlc';
          }
          if (id.includes('/data/spring/')) {
            return 'data-spring';
          }
          if (id.includes('/data/')) {
            return 'data-other';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
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
