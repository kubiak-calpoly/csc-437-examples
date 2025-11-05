import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        newuser: resolve(__dirname, 'new-user.html'),
        venice: resolve(__dirname, 'destination/venice.html'),
        florence: resolve(__dirname, 'destination/florence.html'),
        rome: resolve(__dirname, 'destination/rome.html'),
        blaze: resolve(__dirname, 'profile/blaze.html'),
        izzy: resolve(__dirname, 'profile/izzy.html'),
        mondy: resolve(__dirname, 'profile/mondy.html')

      },
    },
  },
})
