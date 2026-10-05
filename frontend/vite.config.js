import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.DJANGO_API_ORIGIN || 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
});
