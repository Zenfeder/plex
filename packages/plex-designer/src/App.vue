<template>
  <Designer
    :materialConfig="materialConfig"
    :dataModelList="dataModelList"
    @onPreview="handlePreview"
    @onSave="handleSave"
    @onSetDataModel="dialogDataModelVisible = true"/>

  <!-- 预览弹窗 -->
  <el-dialog
    v-if="dialogPreviewVisible"
    v-model="dialogPreviewVisible"
    title="页面"
    :fullscreen="true"
    @close="handlePreviewClose"
  >
    <Preview
      :componentsTree="componentsTree"
      :dataModelList="dataModelList" />
  </el-dialog>

  <!-- 数据模型配置弹窗 -->
  <el-dialog
    v-model="dialogDataModelVisible"
    title="数据模型配置"
    :fullscreen="true"
  >
      <DataModelConfig
        :initData="dataModelList"
        @onDataModelChange="handleDataModelChange"
      />
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted, provide } from 'vue'
import Designer from './components/designer';
import Preview from './components/preview';
import DataModelConfig from './components/data-model-config';
import _ from 'lodash';

const dialogPreviewVisible = ref(false);
const dialogDataModelVisible = ref(false);
const componentsTree = ref({});

// 全局数据域管理
const dataModelList = ref([]);


defineOptions({
  name: 'PlexDesigner'
});

const props = defineProps({
  materialConfig: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits([
  'onPreview',
  'onSave'
]);

const handlePreview = (data) => {
  componentsTree.value = data;
  dialogPreviewVisible.value = true;
  emit('onPreview', componentsTree.value);
}

const handlePreviewClose = () => {}

const handleSave = (data) => {
  componentsTree.value = data;
  emit('onSave', componentsTree.value);
}

const handleDataModelChange = (data) => {
  dataModelList.value = data;
  provide('dataModelList', data);
  sessionStorage.setItem('plex-data-model', JSON.stringify(data));
}

onMounted(() => {
  const data = JSON.parse(sessionStorage.getItem('plex-data-model'));
  if (data) {
    dataModelList.value = data;
    provide('dataModelList', data);
  }
})
</script>