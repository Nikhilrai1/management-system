// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/": {
//         target: "http://localhost:3500",
//         changeOrigin: true,
//         secure: false,
//       }
//     }
//   }
// })


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3500/",
    },
  },
  plugins: [react()],
});
