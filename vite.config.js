// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/gpt': {
        target: 'http://195.179.229.119',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gpt/, '/gpt'),
      }
    }
  },
  define: {
    'process.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY)
  }
});
