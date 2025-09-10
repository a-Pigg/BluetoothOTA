import { createRouter, createWebHistory } from 'vue-router'
import OtaUpdate from '../views/ota/OtaUpdate.vue'
import Config from '../views/config/Config.vue'
import Logs from '../views/logs/Logs.vue'
// import SoapTest from '../views/SoapTest.vue'

const routes = [
  {
    path: '/',
    redirect: '/ota'
  },
  {
    path: '/ota',
    name: 'OtaUpdate',
    component: OtaUpdate
  },
  {
    path: '/config',
    name: 'Config',
    component: Config
  },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router