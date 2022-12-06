import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ssl from "@vitejs/plugin-basic-ssl";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), ssl()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
    open: true,
    https: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8085/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
      },
      "/baiduapi": {
        target: "https://aip.baidubce.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/baiduapi/, ""),
        secure: false,
      },
    },
  },
});
