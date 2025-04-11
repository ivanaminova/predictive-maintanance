import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://10.25.83.50:5000',
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/chat': {
        target: 'http://10.25.83.50:5005/chat',
        rewrite: (path) => path.replace(/^\/chat/, '')
      }
    }
  },
  plugins: [
    react(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
