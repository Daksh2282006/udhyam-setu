import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    watch: {
      ignored: [
        '**/stitch_udyamsetu_business_advisory_platform/**',
        '**/dist/**',
        '**/.git/**'
      ]
    }
  },
  preview: {
    port: 3000,
    host: true
  }
});
