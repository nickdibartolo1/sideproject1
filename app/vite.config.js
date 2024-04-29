// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: 'localhost',
//     port: 3000
//   }, build: {
//     outDir: 'dist'
//   }
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    host: 'localhost',
    port: 3000
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // main: './src/main.jsx'
        main: '/index.html'
      }
    }
  }
});

