import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  mode: "development",
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "mu",
      fileName: "mustang"
    }
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true
    })
  ]
});
