import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;

          if (
              id.includes('node_modules/three') ||
              id.includes('node_modules/@react-three') ||
              id.includes('node_modules/maath') ||
              id.includes('node_modules/three-stdlib')
          ) {
            return 'three-stack';
          }

          if (id.includes('node_modules/gsap')) {
            return 'motion-stack';
          }

          if (id.includes('node_modules/react-globe.gl')) {
            return 'globe-stack';
          }

          return 'vendor';
        },
      },
    },
  },
});
