import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  mode: "development",
  build: {
    minify: false,
    outDir: "dist",
    lib: {
      entry: {
        mustang: "./src/index.ts",
        server: "./src/server/index.ts"
      }
    },
    server: {
      entry: resolve(__dirname, "src/server/index.ts"),
      fileName: "mu-server"
    }
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true
    })
  ]
});
