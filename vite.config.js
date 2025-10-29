import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
//引入node提供内置模块path:可以获取绝对路径
import path from 'path'

const name = 'vue' // page title
// https://vite.dev/config/
export default defineConfig({
  base: './', // 添加这行
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
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  //src文件夹配置别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src')
    }
  },
  //开发服务器配置/
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      
      // 文件上传和配置信息服务代理
      '/api': {
        target: 'http://printer:25172',
        changeOrigin: true,

         rewrite: (path) => path.replace(/^\/api\//, '')  // 删除 /api/
      },
    }
  }
})