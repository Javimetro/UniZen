// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    outDir: 'dist', // specify output directory
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        account: path.resolve(__dirname, 'account.html'),// html
        diary: path.resolve(__dirname, 'diary.html'),
        about: path.resolve(__dirname, 'about.html'),
        signup: path.resolve(__dirname, 'signup.html'),
      }
    }
  }
})
