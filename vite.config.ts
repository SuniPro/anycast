import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5170,
    proxy: {
      // 첫 번째 프록시 설정
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
        ws: true,
      },
      // 두 번째 프록시 설정
      "/game": {
        target: "http://localhost:8050",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/game/, ""),
        secure: false,
        ws: true,
      },
      "/streaming": {
        target: "http://192.168.9.108:8070",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/streaming/, ""),
        secure: false,
        ws: true,
      },
    },
  },
});
