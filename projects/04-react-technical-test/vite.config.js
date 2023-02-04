import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// vitejs config
export default defineConfig({
  plugins: [react()]
})
