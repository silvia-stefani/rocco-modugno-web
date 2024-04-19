import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
const env = loadEnv("dev", process.cwd(), '');
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.NOTION': JSON.stringify(env.NOTION)
  },
  plugins: [react()],
  base: "/",
})
