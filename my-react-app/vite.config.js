import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Set this to '/' for a root-level deployment
  server: {
    port: 3000, // Specify the port for the development server
  },
});
