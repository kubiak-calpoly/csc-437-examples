import { resolve } from "path";
import { defineConfig } from "vite";

export default {
  mode: "development",
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "mu",
      fileName: "mustang"
    }
  }
};
