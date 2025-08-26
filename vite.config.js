import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'

const name =  'vue 111Admin Template' // page title
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      entry: '/src/main.js',
      template: 'index.html',
      inject: {
        data: {
          title: name
        }
      }
    })
  ],
})

