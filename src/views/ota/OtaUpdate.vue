<template>
  <div class="ota-container">
    <!-- <el-button :plain="true" @click="open2">Success</el-button> -->
    <div class="page-header">
      <h2>OTA更新</h2>
    </div>
    <div class="upload-section">
      <div
        class="upload-box"
        @click="triggerFileUpload"
        :class="{ uploading: uploading }"
      >
        <input
          type="file"
          ref="fileInput"
          style="display: none"
          @change="handleFileChange"
          accept=".zip"
        />
        <div v-if="uploading">
          <!-- <el-progress type="circle" :percentage="uploadProgress"></el-progress> -->
          <p>上传中...</p>
        </div>
        <div v-else-if="selectedFile">
          <el-icon class="file-icon"><Document /></el-icon>
          <p>{{ selectedFile.name }}</p>
          <p class="file-size">{{ formatFileSize(selectedFile.size) }}</p>
          <el-button type="primary" size="small" @click.stop="uploadFile"
            >开始上传</el-button
          >
          <el-button type="default" size="small" @click.stop="resetFile"
            >重新选择</el-button
          >
        </div>
        <div v-else>
          <span class="plus-icon">+</span>
          <p>点击上传文件</p>
          <!-- <p class="upload-hint">支持.zip格式</p>
          <p class="upload-hint">压缩包中必须包含app.jar和version.json文件</p> -->
        </div>
      </div>
    </div>
    <!-- <div class="file-info">
      <h3>上传文件的配置信息</h3>
      <div class="info-card" v-if="configInfo">
        <div class="config-header">
          <h4>配置详情</h4>
          <el-button type="primary" size="small" @click="getConfigInfo"
            >刷新配置</el-button
          >
        </div>
        <el-descriptions :column="1" border>
          <el-descriptions-item
            v-for="(value, key) in configInfo"
            :key="key"
            :label="key"
          >
            {{ value }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="info-card" v-else>
        <div class="empty-config">
          <p>暂无配置信息</p>
          <el-button
            type="primary"
            @click="getConfigInfo"
            :loading="configLoading"
            >点击获取配置信息</el-button
          >
        </div>
      </div>
    </div>
    <div class="update" v-if="configInfo">
      <h3>更新配置</h3>
      <div class="info-card">
        <div class="config-header">
          <h4>编辑配置</h4>
          <div>
            <el-button type="primary" @click="updateConfig" :loading="updating"
              >保存更新</el-button
            >
            <el-button type="default" @click="resetConfig">重置</el-button>
          </div>
        </div>
        <el-form
          :model="editableConfig"
          label-width="250px"
          class="config-form"
        >
          <el-form-item
            v-for="(value, key) in editableConfig"
            :key="key"
            :label="key"
          >
            <el-input
              v-model="editableConfig[key]"
              :placeholder="`请输入${key}`"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { Document } from "@element-plus/icons-vue";
import { configApi } from "@/api/config";
const open2 = () => {
  ElMessage.success("message")
};
// 文件上传相关
const fileInput = ref(null);
const selectedFile = ref(null);
const uploading = ref(false);
// const uploadProgress = ref(0)

// 配置信息相关
const configInfo = ref(null);
const configLoading = ref(false);
const editableConfig = ref({});
const updating = ref(false);

// 触发文件选择
const triggerFileUpload = () => {
  if (!selectedFile.value && !uploading.value) {
    fileInput.value.click();
  }
};

// 处理文件选择
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.type !== "application/zip" && !file.name.endsWith(".zip")) {
      ElMessage({
        message: "请上传zip格式的压缩包",
        type: "warning",
      });
      event.target.value = "";
      return;
    }
    selectedFile.value = file;
  }
};

// 格式化文件大小
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// 重置文件选择
const resetFile = () => {
  selectedFile.value = null;
  fileInput.value.value = "";
};

// 上传文件
const uploadFile = async () => {
  if (!selectedFile.value) {
    ElMessage.warning("请先选择文件");
    return;
  }

  uploading.value = true;
  // uploadProgress.value = 50

  // 调用上传API
  const response = await configApi.uploadFile(selectedFile.value);

  // uploadProgress.value = 100
  console.log(response);
  if (response.code === 0) {
    uploading.value = false;
    ElMessage.success(response.data);
  } else {
    uploading.value = false;
    ElMessage.warning(response.data);
  }
};

// 获取配置信息
const getConfigInfo = async () => {
  configLoading.value = true;

  try {
    const response = await configApi.getConfig();
    configInfo.value = response.data;
    // 创建可编辑的配置副本
    editableConfig.value = JSON.parse(JSON.stringify(configInfo.value));
    ElMessage.success("获取配置信息成功");
  } catch (error) {
    ElMessage.error("获取配置信息失败: " + (error.message || "未知错误"));
    console.error("获取配置错误:", error);
  } finally {
    configLoading.value = false;
  }
};

// 更新配置
const updateConfig = async () => {
  updating.value = true;
  try {
    const response = await configApi.updateConfig(editableConfig.value);
    ElMessage.success("更新配置成功，已在同一目录生成旧版配置文件");
    // 重新获取配置信息
    // getConfigInfo();
  } catch (error) {
    ElMessage.error("更新配置失败: " + (error.message || "未知错误"));
    console.error("更新配置错误:", error);
  } finally {
    updating.value = false;
  }
};

// 重置配置
const resetConfig = () => {
  editableConfig.value = JSON.parse(JSON.stringify(configInfo.value));
  ElMessage.info("已重置为当前配置");
};
</script>

<style scoped>
.ota-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
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
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.upload-box:hover {
  border-color: #42b983;
  background-color: #f1f7f4;
}

.upload-box.uploading {
  cursor: default;
  border-color: #409eff;
  background-color: #ecf5ff;
}

.plus-icon {
  font-size: 3rem;
  color: #42b983;
  display: block;
  margin-bottom: 1rem;
}

.upload-hint {
  color: #999;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.file-icon {
  font-size: 2rem;
  color: #409eff;
  margin-bottom: 1rem;
}

.file-size {
  color: #999;
  font-size: 0.9rem;
  margin: 0.5rem 0 1rem;
}

.file-info {
  margin-top: 2rem;
}
.update {
  margin-top: 2rem;
}
.update h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
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

.config-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.config-form {
  margin-top: 20px;
}

.config-form .el-form-item {
  margin-bottom: 15px;
}

.config-header h4 {
  margin: 0;
  color: #2c3e50;
}

.empty-config {
  text-align: center;
  padding: 2rem 0;
}

.empty-config p {
  color: #999;
  margin-bottom: 1rem;
}

.soap-section {
  margin-top: 2rem;
}

.soap-section h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.soap-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.response-section,
.error-section {
  margin-top: 20px;
}

.el-form-item {
  margin-bottom: 18px;
}

h4 {
  color: #303133;
  margin-bottom: 12px;
}
</style>