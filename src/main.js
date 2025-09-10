import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'

// 设置Element Plus全局配置
import { ElMessage } from 'element-plus'

// 添加全局样式，使消息提示显示在顶部
const style = document.createElement('style')
style.textContent = `
  .el-message {
    top: 20px !important;
    transform: translateX(-50%) !important;
    bottom: auto !important;
    margin-bottom: 0 !important;
  }
`
document.head.appendChild(style)

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
