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
  server: {
    host: '0.0.0.0',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/phis': {
        target: 'http://10.193.48.24:8881',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/phis/, '/phisws'),
        timeout: 60000, // 增加超时时间以防API响应较慢
        secure: false   // 非HTTPS连接设为false
      },
      '/chis': {
        target: 'http://10.193.48.24:12307',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/chis/, '/chisws'),
        timeout: 60000,
        secure: false
      }
    }
  }
})