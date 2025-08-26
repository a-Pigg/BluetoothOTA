// axios 请求工具二次封装
// 目的: 1. 利用 axios 请求、响应拦截器功能
//      2. 请求拦截器可在请求头中携带公共参数如 token
//      3. 响应拦截器可简化服务器返回数据，处理 HTTP 网络错误
//      4. 提供 SOAP 请求专用实例和统一的错误处理机制
import axios from 'axios';
import { ElMessage } from 'element-plus';

// 创建基础 axios 实例
const request = axios.create({
  baseURL: '', // 请求的基础路径
  timeout: 30000, // 普通请求超时时间：30秒
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});

// 创建 SOAP 请求专用实例（SOAP 请求通常需要更长的超时时间）
const soapRequest = axios.create({
  baseURL: '', // 请求的基础路径
  timeout: 60000, // SOAP 请求超时时间：60秒
  headers: {
    'Content-Type': 'text/xml;charset=utf-8'
  }
});

// 请求拦截器
request.interceptors.request.use((config) => {
  // 这里可以添加认证 token 等公共参数
  // const token = localStorage.getItem('token');
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 响应拦截器
request.interceptors.response.use((response) => {
  // 简化返回数据，直接返回响应体中的 data
  return response.data;
}, (error) => {
  // 处理 HTTP 网络错误
  handleHttpError(error);
  return Promise.reject(error);
});

// SOAP 请求实例复制拦截器配置
soapRequest.interceptors.request.use(request.interceptors.request.handlers[0].fulfilled);
soapRequest.interceptors.response.use(request.interceptors.response.handlers[0].fulfilled, (error) => {
  // SOAP 请求可能返回 200 但包含错误信息，需要额外处理
  handleSoapError(error);
  return Promise.reject(error);
});

/**
 * 处理 HTTP 错误
 * @param {Object} error - 错误对象
 */
function handleHttpError(error) {
  if (error.response) {
    // 服务器返回了错误状态码
    const status = error.response.status;
    switch (status) {
      case 400:
        ElMessage({ type: 'error', message: '请求参数错误' });
        break;
      case 401:
        ElMessage({ type: 'error', message: '未授权，请登录' });
        // 可以在这里跳转到登录页
        // router.push('/login');
        break;
      case 403:
        ElMessage({ type: 'error', message: '拒绝访问' });
        break;
      case 404:
        ElMessage({ type: 'error', message: '请求路径不存在' });
        break;
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
      case 505:
        ElMessage({ type: 'error', message: '服务器错误' });
        break;
      default:
        ElMessage({ type: 'error', message: `请求失败: ${error.message}` });
    }
  } else if (error.request) {
    // 请求已发送但未收到响应
    ElMessage({ type: 'error', message: '网络错误，请检查网络连接' });
  } else {
    // 请求配置出错
    ElMessage({ type: 'error', message: `请求配置错误: ${error.message}` });
  }
}

/**
 * 处理 SOAP 错误
 * @param {Object} error - 错误对象
 */
function handleSoapError(error) {
  // SOAP 错误处理逻辑
  if (error.response && error.response.status === 200) {
    // 有些 SOAP 服务返回 200 但包含错误信息
    // 这里可以根据实际的 SOAP 错误格式进行解析
    ElMessage({ type: 'error', message: 'SOAP 服务处理错误' });
  } else {
    // 其他情况使用通用 HTTP 错误处理
    handleHttpError(error);
  }
}

/**
 * 封装 GET 请求
 * @param {string} url - 请求地址
 * @param {Object} params - 请求参数
 * @param {Object} config - 额外配置
 * @returns {Promise}
 */
export const get = (url, params = {}, config = {}) => {
  return request({
    url,
    method: 'get',
    params,
    ...config
  });
};

/**
 * 封装 POST 请求
 * @param {string} url - 请求地址
 * @param {Object} data - 请求数据
 * @param {Object} config - 额外配置
 * @returns {Promise}
 */
export const post = (url, data = {}, config = {}) => {
  return request({
    url,
    method: 'post',
    data,
    ...config
  });
};

/**
 * 发送 SOAP 请求
 * @param {string} url - 请求地址
 * @param {string} soapXml - SOAP XML 请求体
 * @param {string} soapAction - SOAP Action
 * @returns {Promise}
 */
export const soap = (url, soapXml, soapAction) => {
  return soapRequest({
    url,
    method: 'post',
    data: soapXml,
    headers: {
      'SOAPAction': soapAction || ''
    }
  });
};

// 导出默认实例和封装的方法
export default request;


