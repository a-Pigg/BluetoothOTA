import request from '@/utils/request'

// 配置服务API
export const configApi = {
  // 上传文件
  uploadFile(file) {
    const formData = new FormData()
    formData.append('zip', file)
    
    return request.post('/jar/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  
  // 获取配置信息
  getConfig() {
    return request.get('/config/getconfig')
  },

  // 更新配置文件
  updateConfig(config) {
    return request.post('/config/updateconfig', config, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}