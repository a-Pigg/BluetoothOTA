<template>
  <div class="config-container">
    <h2>配置</h2>
    <div class="config-info">
      <div class="config-box">
        <h3>上传文件的配置信息</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Config'
}
</script>

<style scoped>
.config-container {
  padding: 2rem;
}

.config-info {
  margin-top: 2rem;
}

.config-box {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>