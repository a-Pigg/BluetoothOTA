<template>
  <nav class="nav-container">
    <div class="nav-title">设备管理</div>
    <div class="nav-items">
      <router-link to="/ota" class="nav-item">OTA更新</router-link>
      <router-link to="/config" class="nav-item">配置</router-link>
      <router-link to="/logs" class="nav-item">日志</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.nav-container {
  width: 200px;
  height: 100vh;
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
}

.nav-title {
  padding: 1.5rem 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  border-bottom: 1px solid #34495e;
  text-align: center;
}

.nav-items {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
}

.nav-item {
  padding: 1rem;
  text-decoration: none;
  color: #ecf0f1;
  transition: background-color 0.3s;
  font-size: 1rem;
}

.nav-item:hover {
  background-color: #34495e;
}

.router-link-active {
  background-color: #34495e;
  border-left: 4px solid #42b983;
}
</style>