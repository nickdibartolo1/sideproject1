// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// // import dns from 'dns'


// // dns.setDefaultResultOrder('verbatim');

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
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: ''
      }
    }
  },
  publicDir: 'public'
});
