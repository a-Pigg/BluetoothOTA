<template>
  <div class="device-container">
    <div class="file-info">
      <h3>检测设备详情</h3>
      <div class="info-card" v-if="deviceInfo">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="检测日期" />
          <el-table-column
            prop="name"
            label="操作"
            width="600"
            align="center"
            header-align="center"
          >
            <template #default="scope">
              <el-button
                size="small"
                @click="handleDetail(scope.$index, scope.row)"
                class="custom-report-btn"
                type="primary"
              >
                查看检测报告详情
              </el-button>
            </template></el-table-column
          >
        </el-table>
      </div>
      <div class="empty-card" v-else>
        <div class="empty-config" @click="a">
          <!-- 使用 Element Plus 图标，通过类名放大 -->
          <el-icon :size="60" color="#999" class="empty-icon">
            <Search />
          </el-icon>
          <p>去检测设备详情</p>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" width="700" center @close="handleClose">
      <div class="dialog-content">
        <h4 class="dialog-title">硬件详情</h4>
        <div class="detail-item">
          <span class="label">蓝牙：</span>
          <span class="value">正常</span>
        </div>
        <div class="detail-item">
          <span class="label">WIFI：</span>
          <span class="value">已连接</span>
        </div>
        <div class="detail-item">
          <span class="label">网口：</span>
          <span class="value">正常</span>
        </div>
        <div class="detail-item">
          <span class="label">打印机连接交互状态：</span>
          <span class="value">已连接</span>
        </div>
      </div>
      <div class="dialog-input">
        <h4 class="dialog-title">三要素填入</h4>
        <div class="input-group">
          <label for="xoc1">XXX:</label>
          <el-input v-model="form.xoc1" placeholder="请输入XXX" style="width: 600px"/>
        </div>
        <div class="input-group">
          <label for="xoc2">XXX:</label>
          <el-input v-model="form.xoc2" placeholder="请输入XXX" style="width: 600px"/>
        </div>
        <div class="input-group">
          <label for="xoc3">XXX:</label>
          <el-input v-model="form.xoc3" placeholder="请输入XXX" style="width: 600px"/>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submit"> 保存 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";

const deviceInfo = ref(1);
const dialogVisible = ref(false);

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];

// 默认表单值
const defaultForm = {
  xoc1: "",
  xoc2: "",
  xoc3: "",
};

// 响应式表单
const form = reactive({ ...defaultForm });

const handleDetail = (index, row) => {
  console.log(index, row);
  dialogVisible.value = true;
};

const submit = () => {
  dialogVisible.value = false;
};

// 关闭弹窗时重置表单
const handleClose = () => {
  console.log('关闭事件')
  Object.assign(form, defaultForm); // 一键重置
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
  /* padding: 1.5rem; */
  border-radius: 8px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); */
}
.empty-card {
  padding: 1.5rem;
  border-radius: 8px;
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

/* .empty-config {
  text-align: center;
  padding: 2rem 0;
} */

.empty-config {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  height: 600px; /* 给一个固定高度或最小高度，以便居中生效 */
  text-align: center;
  padding: 2rem 0;
}
.empty-config .empty-icon {
  margin-bottom: 1rem;
  cursor: pointer;
}

.empty-config p {
  color: #999;
  margin-bottom: 1rem;
  cursor: pointer;
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

/* 深蓝色主题按钮 */ /* 深蓝色，Material Design 风格 */
/* :deep(.custom-report-btn) {
  background-color: #080000ec; 
  border-color: #1976d2;
  color: #fff;
  transition: all 0.3s ease;
} */

/* :deep(.custom-report-btn):hover,
:deep(.custom-report-btn):focus {
  background-color: #1565c0;
  border-color: #1565c0;
  color: #fff;
}

:deep(.custom-report-btn):active {
  background-color: #0d47a1;
  border-color: #0d47a1;
} */

/* 对话框内容整体样式 */
:deep(.dialog-content) {
  font-size: 15px; /* 默认字体稍大一点（原为14px） */
  line-height: 1.8;
  color: #333;
  margin-bottom: 20px;
}

/* 标题：硬件详情 */
:deep(.dialog-title) {
  font-size: 18px; /* 比其他文字明显大 */
  font-weight: 600;
  margin-bottom: 5px;
  color: #2c3e50;
  /* border-bottom: 2px solid #eee; */
  /* padding-bottom: 4px; */
}

/* 每一行详情 */
:deep(.detail-item) {
  /* margin-bottom: 2px; */
}

/* 字段名（如“蓝牙：”）可以加粗 */
:deep(.label) {
  font-weight: 500;
  color: #2c3e50;
}

/* 值（如“正常”）保持普通 */
:deep(.value) {
  color: #666;
}

/* 对话框内容整体样式 */
:deep(.dialog-input) {
  font-size: 15px; /* 默认字体稍大一点（原为14px） */
  line-height: 1.8;
  color: #333;
  margin-bottom: 20px;
}

/* 输入组样式 */
:deep(.input-group) {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  /* gap: 1px; */
}

:deep(.input-group label) {
  min-width: 45px;
  font-weight: 500;
  color: #2c3e50;
}

:deep(.input-group .el-input) {
  /* flex: 1; */
}
</style>