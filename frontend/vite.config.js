import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv"

// https://vitejs.dev/config/
export default ({_mode}) => {
  dotenv.config({path: "./.env"})
  const URL = process.env.VITE_API_URL; // http://localhost:9926

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        "/Snippet": {
          target: URL,
          changeOrigin: true
        },
        "/Score": {
          target: URL,
          changeOrigin: true
        }
      }
    }
  })
}
