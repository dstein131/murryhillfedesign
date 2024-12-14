// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Sets the dev server to run on localhost:3000
    // Optional: Specify the host if needed
    // host: 'localhost',
  },
});
