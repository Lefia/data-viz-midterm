import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/data-viz-midterm/',
  resolve: {
    alias: {
      '@': '/src',
      '@data': '/public/data',
      '@components': '/src/components',
    }
  },
})
