import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const service = axios.create({
  baseURL: '/api/config', // 可以根据环境配置不同的baseURL
  timeout: 30000, // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 添加token等认证信息
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`
    // }
    return config
  },
  error => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 可以根据后端返回的状态码进行统一处理
    // if (res.code !== 200) {
    //   ElMessage.error(res.message || '请求失败')
    //   return Promise.reject(new Error(res.message || '请求失败'))
    // }
    return res
  },
  error => {
    console.error('响应错误:', error)
    // const message = error.response?.data?.message || error.message || '网络错误'
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

// 导出请求实例
export default service