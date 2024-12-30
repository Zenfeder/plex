<template>
  <Designer
    :materialConfig="materialConfig"
    @onPreview="handlePreview"
    @onSave="handleSave"
    @onSetDataModel="dialogDataModelVisible = true"
    @onSetTasks="dialogTasksVisible = true"/>

  <!-- 预览弹窗 -->
  <el-dialog
    v-if="dialogPreviewVisible"
    v-model="dialogPreviewVisible"
    title="页面"
    :fullscreen="true"
    @close="handlePreviewClose"
  >
    <Preview />
  </el-dialog>

  <!-- 数据模型配置弹窗 -->
  <el-dialog
    v-model="dialogDataModelVisible"
    title="数据模型配置"
    :fullscreen="true"
  >
      <DataModelConfig />
  </el-dialog>

  <!-- 任务配置弹窗 -->
  <el-dialog
    v-model="dialogTasksVisible"
    title="任务配置"
    :fullscreen="true"
  >
      <TasksConfig />
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, provide, onBeforeUnmount } from 'vue'
import Designer from './components/designer';
import Preview from './components/preview';
import DataModelConfig from './components/data-model-config';
import TasksConfig from './components/tasks-config';
import _ from 'lodash';

const dialogPreviewVisible = ref(false);
const dialogDataModelVisible = ref(false);
const dialogTasksVisible = ref(false);
const componentsTree = ref([]);
provide('componentsTree', componentsTree);

// 全局数据模型管理
const dataModelList = ref([]);
provide('dataModelList', dataModelList);

// 全局任务管理
const tasksList = ref([]);
provide('tasksList', tasksList);

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
  dialogPreviewVisible.value = true;
  emit('onPreview', componentsTree.value);
}

const handlePreviewClose = () => {}

const handleSave = (data) => {
  emit('onSave', componentsTree.value);
}

onMounted(() => {
  const componentsTreeLocal = JSON.parse(localStorage.getItem('plex-components-tree'));
  const modelListLocal = JSON.parse(localStorage.getItem('plex-data-model'));
  const tasksListLocal = JSON.parse(localStorage.getItem('plex-tasks'));

  componentsTreeLocal && (componentsTree.value = componentsTreeLocal);
  modelListLocal && (dataModelList.value = modelListLocal);
  tasksListLocal && (tasksList.value = tasksListLocal);
})

window.onbeforeunload = () => {
  // 缓存工作区正在搭建的组件树
  localStorage.setItem('plex-components-tree', JSON.stringify(componentsTree.value));
}
</script>