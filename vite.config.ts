import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, './src/utils/'),
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@context': path.resolve(__dirname, './src/context/'),
      '@hooks': path.resolve(__dirname, './src/hooks/'),
    },
  },
});
