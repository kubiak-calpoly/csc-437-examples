import { resolve } from "path";
import { defineConfig } from "vite";

export default {
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "mu",
      fileName: "mustang"
    }
  }
};
