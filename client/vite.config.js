// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        login: path.resolve(__dirname, 'login.html'),// html
        menu: path.resolve(__dirname, 'menu.html'),
        modifyCredentials: path.resolve(__dirname, 'modifyCredentials.html'),
        register: path.resolve(__dirname, 'register.html'),
      }
    }
  }
})
