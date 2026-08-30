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

          if (
            id.includes('@react-three/fiber') ||
            id.includes('@react-three/drei') ||
            id.includes('three/') ||
            id.includes('three-stdlib')
          ) {
            return 'vendor-three';
          }

          if (id.includes('gsap')) {
            return 'vendor-gsap';
          }

          if (id.includes('@emailjs/browser')) {
            return 'vendor-emailjs';
          }

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
