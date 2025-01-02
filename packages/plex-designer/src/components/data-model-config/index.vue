<template>
  <div class="data-field">
    <el-button type="primary" size="small" @click="handleAddDataModel">添加数据模型</el-button>
    <el-table :data="dataModelList" style="width: 100%">
      <el-table-column prop="id" label="数据模型ID"/>
      <el-table-column prop="name" label="数据模型名称"/>
      <el-table-column prop="type" label="数据模型类型">
        <template #default="scope">
          {{ dataModelTypeEnums.find(item => item.value === scope.row.type)?.label }}
        </template>
      </el-table-column>
      <el-table-column prop="method" label="方法"/>
      <el-table-column prop="url" label="接口地址" />
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="scope">
          <el-popconfirm title="知道你自己在干啥吧？" hide-icon @confirm="handleDeleteDataModel(scope.row)">
            <template #reference>
              <el-button link type="primary" size="small">删除</el-button>
            </template>
          </el-popconfirm>
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
      <!-- <el-form-item label="模型类型">
        <el-select v-model="dataModelForm.type" placeholder="请选择数据模型类型" style="width: 600px">
          <el-option v-for="item in dataModelTypeEnums" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item> -->
      <template v-if="dataModelForm.type === 'API'">
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
        <el-tabs v-model="activeTab">
          <el-tab-pane 
            v-for="item in ['query', 'body', 'response']"
            :name="item"
            :label="item === 'query' ? 'Query 参数' : item === 'body' ? 'Body 参数' : '响应数据'"
            :key="item">
            <div class="panel-box">
              <div class="model-box">
                <DataModelConfig :model="dataModelForm[item]" />
              </div>
              <div class="preview-box">
                数据结构预览：
                <pre>{{ item === 'query' ? generatePreviewQuery : item === 'body' ? generatePreviewBody : generatePreviewResponse }}</pre>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
      <template v-else>
        <div class="panel-box">
          <div class="model-box">
            <DataModelConfig :model="dataModelForm.enums" />
          </div>
          <div class="preview-box">
            枚举数据结构：
            <pre>{{ generatePreviewEnums }}</pre>
          </div>
        </div>
      </template>
    </el-form>
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
import dataModelTypeEnums from '../../utils/dataModelTypeEnums';
import DataModelConfig from './DataModelConfig.vue';

const emit = defineEmits(['onDataModelChange'])

const dataModelList = inject('dataModelList');

const activeTab = ref('query');
const methodOptions = ['GET', 'POST', 'PUT', 'DELETE']
const dataModelForm = reactive({
  name: '',
  type: dataModelTypeEnums[0].value,
  url: '',  // 接口地址
  method: methodOptions[0],
  query: [],
  body: [],
  response: [], // 接口响应
  enums: [] // 枚举数据
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
const generatePreviewEnums = computed(() => ({
  enums: dataModelForm.enums,
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
  dataModelForm.type = dataModelTypeEnums[0].value
  dataModelForm.url = ''
  dataModelForm.method = methodOptions[0]
  dataModelForm.query = []
  dataModelForm.body = []
  dataModelForm.response = []
  dataModelForm.enums = []
}

const handleEditDataModel = (row) => {
  dialogMode.value = 'edit'
  dialogAddVisible.value = true
  activeTab.value = 'query'
  // 重置
  dataModelForm.id = row.id
  dataModelForm.name = row.name
  dataModelForm.type = row.type
  dataModelForm.url = row.url
  dataModelForm.method = row.method || methodOptions[0]
  dataModelForm.query = row.query || []
  dataModelForm.body = row.body || []
  dataModelForm.response = row.response || []
  dataModelForm.enums = row.enums || []
}

const handleDataModelSubmit = () => {
  let { id, name, type, url, method, query, body, response, enums } = dataModelForm

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
      type,
      url,
      method,
      query,
      body,
      response,
      enums
    })
  } else {
    // 编辑数据字段
    dataModelList.value = dataModelList.value.map(item => {
      if (item.id === id) {
        item.name = name
        item.type = type
        item.url = url
        item.method = method
        item.query = query
        item.body = body
        item.response = response
        item.enums = enums
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
  localStorage.setItem('plex-data-model', JSON.stringify(data));
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
