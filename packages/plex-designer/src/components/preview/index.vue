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
import _ from 'lodash';
import PreviewRenderer from './renderer';
import { findComponentNodeById } from '../../utils/component-tree-tools';
import { useComponentListWithKeys } from '../../hooks/components-tree-helper';

const componentsTree = inject('componentsTree');
const dataModelList = inject('dataModelList');
const tasksList = inject('tasksList');

const componentListWithField = useComponentListWithKeys(componentsTree, ['field']);
const componentListWithDataModel = useComponentListWithKeys(componentsTree, ['dataModel']);

// 统一管理组件数据绑定
const dataBind = reactive({});
provide('dataBind', dataBind);

const emit = defineEmits([
  'onCustomEvent',
]);

// 收集组件树中所有的数据模型调用
const collectAllDataModel = () => {}

// 加载数据模型
const loadDataModel = async () => {}

const fetchApi = async (url, method, query, body) => {
  try {
    const response = await axios({ method, url, params: query });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
// 初始化 dataBind 字段。字段 key 统一以 ${组件id}.${组件schema.props.field} 为 key
const initDataBind = () => {
  componentListWithField.value.forEach(component => {
    const { id, schema } = component;
    const field = schema.props.find(prop => prop.key === 'field');
    if (!field) return;
    dataBind[`${id}.${field.value}`] = '';
  })
}

initDataBind();

// 数据模型参数与组件field绑定
const dataModelParamsBind = async () => {}

// 数据模型响应与组件绑定
const dataModelResponseBind = async () => {}

const handleCustomEvent = ({ eventName, taskQueue, event }) => {
  taskQueue.forEach(async task => {
    const $task = tasksList.value.find(item => item.id === task.taskId);
    console.log('>>> task: ', $task);
    // Todo: 事件处理
    // 接口请求类任务处理
    if ($task.type === 'api') {
      // fetchApi(task.url, task.method, task.query, task.body);
      const dataModel = dataModelList.value.find(item => item.id === $task.dataModelId);
      console.log('>>> dataModel: ', dataModel);
      const { url, method } = dataModel;
      const query = {};

      // 数据模型参数绑定
      if (!$task.dataModelParams) return;
      for (let i = 0; i < $task.dataModelParams.length; i++) {
        const param = $task.dataModelParams[i];
        // param 示例：{keyPath: 'query.id', bindPropsKey: 'field', bindComponentId: '40ZHa51g9auM8N78'}
        if (param.bindComponentId) {
          // 从嵌套树形结构 componentsTree 中递归查找
          const componentNode = findComponentNodeById(componentsTree.value, param.bindComponentId);
          console.log('>>> componentNode: ', componentNode);
          const field = componentNode.schema.props.find(prop => prop.key === param.bindPropsKey);
          if (field) {
            query[param.keyPath.split('.')[1]] = dataBind[`${param.bindComponentId}.${field.value}`];
          }
        }
      }
      console.log('>>> query: ', query);
      const response = await fetchApi(url, method, query, {});
      console.log('>>> response: ', response);
      // 数据模型响应绑定
      componentListWithDataModel.value.forEach(component => {
        console.log('>>> componentListWithDataModel: ', component);
        const { id, schema } = component;
        const normalizeProps = schema.props.reduce((acc, prop) => {
          acc[prop.key] = prop.value;
          return acc;
        }, {});
        const dataModelValue = normalizeProps['dataModel']
        const fieldValue = normalizeProps['field']
        console.log('>>> dataModelValue: ', dataModelValue);
        if (!dataModelValue) return;
        // dataModelValue 的格式示例：hWzC3X1M5wgbr5s2.response.data.username
        const dataModelFieldType = dataModelValue.split('.')[1];
        const dataModelFieldPath = dataModelValue.split('.').slice(2).join('.');
        if (dataModelFieldType === 'response') {
          dataBind[`${id}.${fieldValue}`] = _.get(response, dataModelFieldPath);
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

// onMounted(() => {
//   initDataBind();
// });

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