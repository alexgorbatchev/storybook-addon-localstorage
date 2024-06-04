import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

console.log('Using .storybook/vite.config.ts');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
