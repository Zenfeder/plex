<template>
  <div class="preview-container">
    <PreviewRenderer
      v-for="component in componentsTree"
      :key="component.id"
      :component="component"
      :style="{ 'width': '100%', 'min-height': '100%' }"
      @onCustomEvent="handleCustomEvent"/>
  </div>
</template>

<script setup>
import { ref, provide, inject, reactive, onMounted } from 'vue';
import axios from 'axios';
import _, { isArray } from 'lodash';
import PreviewRenderer from './renderer';
import { findComponentNodeById } from '../../utils/component-tree-tools';
import { useFlattenAndFilterComponentTree } from '../../hooks/components-tree-helper';

const componentsTree = inject('componentsTree');
const dataModelList = inject('dataModelList');
const tasksList = inject('tasksList');

const componentListWithModelValue = useFlattenAndFilterComponentTree(componentsTree, (node) => {
  return node.schema && node.schema.props && node.schema.props.find(prop => prop.key === 'modelValue');
});
const componentListBindDataModel = useFlattenAndFilterComponentTree(componentsTree, (node) => {
  return node.schema && node.schema.props && node.schema.props.find(prop => prop.hasOwnProperty('bindDataModel'));
});

// 统一管理组件数据绑定
const dataBind = reactive({});
provide('dataBind', dataBind);

const emit = defineEmits([
  'onCustomEvent',
]);

const fetchApi = async (url, method, query, body) => {
  try {
    const response = await axios({ method, url, params: query, data: body });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
// 初始化 dataBind 字段。字段 key 统一以 ${组件id}.${组件schema.props.key} 为键，值初始化都为空字符串
const initDataBind = () => {
  componentListWithModelValue.value.forEach(component => {
    const { id: componentId } = component;
    dataBind[`${componentId}.modelValue`] = '';
  })
  componentListBindDataModel.value.forEach(component => {
    const { id: componentId } = component;
    const needBindDataModelProps = component.schema?.props?.filter(prop => prop.hasOwnProperty('bindDataModel'));
    if (!needBindDataModelProps) return;
    needBindDataModelProps.forEach(prop => {
      // 要根据 prop.value 的默认值类型来初始化
      dataBind[`${componentId}.${prop.key}`] = isArray(prop.value) ? [] : typeof prop.value === 'number' ? 0 : typeof prop.value === 'boolean' ? false : '';
    })
  })
}

initDataBind();
console.log('>>> after init dataBind: ', dataBind);

const handleCustomEvent = ({ eventName, taskQueue, event }) => {
  taskQueue.forEach(async task => {
    const $task = tasksList.value.find(item => item.id === task.taskId);
    const { type: taskType, dataModelId: taskDataModelId, dataModelParams: taskDataModelParams } = $task;
    // 接口请求类任务处理
    if (taskType === 'API') {
      const dataModel = dataModelList.value.find(item => item.id === taskDataModelId);
      const { url, method } = dataModel;
      const query = {};

      // 数据模型参数绑定
      if (!taskDataModelParams) return;
      for (let i = 0; i < taskDataModelParams.length; i++) {
        const param = taskDataModelParams[i]; // eg：{ keyPath: 'query.id', bindComponentId: '40ZHa51g9auM8N78' }
        if (param.bindComponentId) {
          query[param.keyPath.split('.')[1]] = dataBind[`${param.bindComponentId}.modelValue`];
        }
      }

      // 数据模型响应绑定
      const response = await fetchApi(url, method, query, {});
      componentListBindDataModel.value.forEach(component => {
        const { id, schema } = component;
        const targetProps = schema?.props?.find(prop => prop.hasOwnProperty('bindDataModel'));
        const bindDataModel = targetProps.bindDataModel; // eg：hWzC3X1M5wgbr5s2.response.data.username
        if (!bindDataModel) return;
        const bindDataModelId = bindDataModel.split('.')[0]; // 当前组件数据模型字段绑定的数据模型 id
        const bindFieldType = bindDataModel.split('.')[1];
        const bindFieldPath = bindDataModel.split('.').slice(2).join('.');
        // 注意仅仅重置 dataBind 中，与当前数据模型绑定的字段的值
        if (bindFieldType === 'response' && bindDataModelId === taskDataModelId) {
          const bindFieldValue = _.get(response, bindFieldPath);  
          dataBind[`${id}.${targetProps.key}`] = bindFieldValue === undefined ? dataBind[`${id}.${targetProps.key}`] : bindFieldValue;
          targetProps.value = dataBind[`${id}.${targetProps.key}`]; // 这样会有数据缓存，组件树渲染时直接拿这个值渲染了
        }
      })
    }
  })
  emit('onCustomEvent', {
    eventName,
    taskQueue,
    event,
  })
}

// 解决浏览器窗口大小变化，画布宽度不更新问题
const refresh = ref(false);
window.onresize = _.debounce(() => {
  refresh.value = true;
  setTimeout(() => {
    refresh.value = false;
  }, 0);
}, 200);
</script>

<style lang="less" scoped>
.preview-container {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  padding: 20px 5px 5px 5px;
  background: #f7f7f9;
}
</style>