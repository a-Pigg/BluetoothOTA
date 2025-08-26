<template>
  <div class="ota-container">
    <div class="page-header">
      <h2>OTA更新</h2>
    </div>
    <div class="upload-section">
      <div class="upload-box">
        <span class="plus-icon">+</span>
        <p>点击或拖拽文件到此处上传</p>
      </div>
    </div>
    <div class="file-info">
      <h3>上传文件的配置信息</h3>
      <div class="info-card">
        <p>请选择需要更新的固件文件</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OtaUpdate'
}
</script>

<style scoped>
.ota-container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.page-header h2 {
  color: #2c3e50;
  margin: 0;
}

.upload-section {
  margin: 2rem 0;
}

.upload-box {
  border: 2px dashed #ccc;
  padding: 3rem;
  text-align: center;
  cursor: pointer;
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.upload-box:hover {
  border-color: #42b983;
  background-color: #f1f7f4;
}

.plus-icon {
  font-size: 3rem;
  color: #42b983;
  display: block;
  margin-bottom: 1rem;
}

.file-info {
  margin-top: 2rem;
}

.file-info h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.info-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>