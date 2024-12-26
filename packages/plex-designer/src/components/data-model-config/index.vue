<template>
  <div class="data-field">
    <el-button type="primary" size="small" @click="handleAddDataModel">添加数据模型</el-button>
    <el-table :data="dataModelList" style="width: 100%">
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="method" label="方法"/>
      <el-table-column prop="url" label="地址" width="120" />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleDeleteDataModel(scope.row)">删除</el-button>
          <el-button link type="primary" size="small" @click="handleEditDataModel(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    v-model="dialogAddVisible"
    :title="dialogTitle"
    width="90%">
    <el-form label-width="120px">
      <el-form-item label="模型名称">
        <el-input v-model="dataModelForm.name" style="max-width: 600px" placeholder="请输入数据模型名称"></el-input>
      </el-form-item>
      <el-form-item label="接口地址">
        <el-input
          v-model="dataModelForm.url"
          style="max-width: 600px"
          placeholder="请输入接口地址"
        >
          <template #prepend>
            <el-select v-model="dataModelForm.method" placeholder="请选择" style="width: 100px">
              <el-option v-for="item in methodOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </template>
        </el-input>
      </el-form-item>
    </el-form>

    <el-tabs v-model="activeTab">
      <el-tab-pane label="Query 参数" name="query">
        <div class="panel-box">
          <div class="model-box">
            <DataModelConfig :model="dataModelForm.query" />
          </div>
          <div class="preview-box">
            数据结构预览：
            <pre>{{ generatePreviewQuery }}</pre>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Body 参数" name="body">
        <div class="panel-box">
          <div class="model-box">
            <DataModelConfig :model="dataModelForm.body" />
          </div>
          <div class="preview-box">
            数据结构预览：
            <pre>{{ generatePreviewBody }}</pre>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="响应模型" name="response">
        <div class="panel-box">
          <div class="model-box">
            <DataModelConfig :model="dataModelForm.response" />
          </div>
          <div class="preview-box">
            数据结构预览：
            <pre>{{ generatePreviewResponse }}</pre>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取消</el-button>
        <el-button type="primary" @click="handleDataModelSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, watch, computed, inject } from 'vue';
import { ElMessage } from 'element-plus'
import { generateRandomString } from '../../utils/common';
import DataModelConfig from './DataModelConfig.vue';

const emit = defineEmits(['onDataModelChange'])

const dataModelList = inject('dataModelList');

const props = defineProps({
  initData: {
    type: Array,
    default: () => []
  }
})

const activeTab = ref('query');
const methodOptions = ['GET', 'POST', 'PUT', 'DELETE']
const dataModelForm = reactive({
  name: '',
  url: '',  // 接口地址
  method: methodOptions[0],
  query: [],
  body: [],
  response: []
})

const dialogAddVisible = ref(false)
const dialogMode = ref('add')
const dialogTitle = computed(() => {
  dialogMode.value === 'add' ? '添加数据模型' : '编辑数据模型'
})

const generatePreviewQuery = computed(() => ({
  query: dataModelForm.query,
}));
const generatePreviewBody = computed(() => ({
  body: dataModelForm.body,
}));
const generatePreviewResponse = computed(() => ({
  response: dataModelForm.response,
}));

const validateField = (value, fieldName) => {
  if (!value.trim()) {
    ElMessage({ message: `${fieldName}不能为空`, type: 'warning' })
    return false
  }
  return true
}

const handleAddDataModel = () => {
  dialogMode.value = 'add'
  dialogAddVisible.value = true
  activeTab.value = 'query'
  // 清空
  dataModelForm.id = generateRandomString()
  dataModelForm.name = ''
  dataModelForm.url = ''
  dataModelForm.method = methodOptions[0]
  dataModelForm.query = []
  dataModelForm.body = []
  dataModelForm.response = []
}

const handleEditDataModel = (row) => {
  dialogMode.value = 'edit'
  dialogAddVisible.value = true
  activeTab.value = 'query'
  // 重置
  dataModelForm.id = row.id
  dataModelForm.name = row.name
  dataModelForm.url = row.url
  dataModelForm.method = row.method || methodOptions[0]
  dataModelForm.query = row.query || []
  dataModelForm.body = row.body || []
  dataModelForm.response = row.response || []
}

const handleDataModelSubmit = () => {
  let { id, name, url, method, query, body, response } = dataModelForm

  if (!validateField(name, '名称') || !validateField(url, '接口地址')) return
  if (dialogMode.value === 'add' && dataModelList.value.some(item => item.name === name)) {
    ElMessage({ message: '名称已存在', type: 'warning' })
    return
  }

  if (dialogMode.value === 'add') {
    // 添加数据字段
    dataModelList.value.push({
      id,
      name,
      url,
      method,
      query,
      body,
      response
    })
  } else {
    // 编辑数据字段
    dataModelList.value = dataModelList.value.map(item => {
      if (item.id === id) {
        item.name = name
        item.url = url
        item.method = method
        item.query = query
        item.body = body
        item.response = response
      }
      return item
    })
  }

  dialogAddVisible.value = false

  ElMessage({ message: dialogMode.value === 'add' ? '添加成功' : '编辑成功', type: 'success' })

  setDataModelToStorage(dataModelList.value)
  emit('onDataModelChange', dataModelList.value)
}

// 删除
const handleDeleteDataModel = (row) => {
  dataModelList.value = dataModelList.value.filter(item => item.id !== row.id)
  setDataModelToStorage(dataModelList.value)
  emit('onDataModelChange', dataModelList.value)
}

const setDataModelToStorage = (data) => {
  sessionStorage.setItem('plex-data-model', JSON.stringify(data));
}
</script>

<style scoped lang="less">
.panel-box {
  display: flex;
  .preview-box {
    width: 300px;
  }
  .model-box {
    flex: 1;
  }
}
</style>
