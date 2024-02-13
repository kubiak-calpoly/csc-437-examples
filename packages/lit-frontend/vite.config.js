// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        app: resolve(__dirname, "app/index.html")
      }
    }
  }
});
