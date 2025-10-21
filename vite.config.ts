import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5010,
    proxy: {
      // 첫 번째 프록시 설정
      "/streaming": {
        target: "http://13.214.147.245:8070",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/streaming/, ""),
        secure: false,
        ws: true,
      },
    },
  },
});
