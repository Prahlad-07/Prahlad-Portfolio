import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('@emailjs/browser')) return 'vendor-emailjs';
          return undefined;
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    preTransformRequests: ['index.html'],
  },
});
