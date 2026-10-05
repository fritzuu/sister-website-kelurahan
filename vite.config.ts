import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: { rollupOptions: { output: { manualChunks(id) {
    if (id.includes('/node_modules/gsap/')) return 'scroll-animation';
    if (id.includes('/node_modules/motion/') || id.includes('/node_modules/framer-motion/') || id.includes('/node_modules/motion-dom/') || id.includes('/node_modules/motion-utils/')) return 'motion';
    if (id.includes('/node_modules/react-router')) return 'routing';
    if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/') || id.includes('/node_modules/scheduler/')) return 'react';
  } } } },
});
