<template>
  <div class="preview-renderer"
    ref="elementRef"
    :style="wrapperStyle">
    <!-- 渲染组件 -->
    <component
      :is="component.type"
      :style="componentStyle"
      v-bind="normalizeProps"
      v-model="dataBind[normalizeProps.field]"
      v-on="normalizeEvents"
    >
      <!-- 递归渲染子组件 -->
      <template v-if="component.children?.length">
        <PreviewRenderer
          v-for="$component in component.children"
          :key="$component.id"
          :component="$component"/>
      </template>
      <template v-else-if="normalizeProps.slot">{{ normalizeProps.slot }}</template>
      <template v-else-if="component.label">{{ component.label }}</template>
    </component>
  </div>
</template>

<script setup>
import { reactive, ref, watch, computed, onMounted, inject } from 'vue';
import axios from 'axios';
import _ from 'lodash';

defineOptions({
  name: 'PreviewRenderer'
});

const tasksList = inject('tasksList');
const elementRef = ref();

// Props
const props = defineProps({
  component: {
    type: Object,
    default: () => {},
  },
  siblingLength: {
    type: Number,
    default: 0,
  },
  index: {
    type: Number,
    default: 0,
  },
  activeComponentNode: {
    type: Object,
    default: () => null,
  },
});

const emit = defineEmits([
  'onComponentNodeClick',
  'onComponentNodeMoveDown',
  'onComponentNodeMoveUp',
  'onComponentNodeDelete',
  'setActiveNodeMaskStyle',
]);

// 把 component.schema.props 从数组转换成对象
const normalizeProps = computed(() => {
  if (!props.component?.schema?.props) return {};
  return props.component.schema.props.reduce((acc, prop) => {
    acc[prop.key] = prop.value;
    return acc;
  }, {});
})

// 把 component.schema.style 从数组转换成对象
const normalizeStyle = computed(() => {
  if (!props.component?.schema?.style) return {};
  return props.component.schema.style.reduce((acc, style) => {
    if (style.value !== undefined && style.value !== null) {
      acc[style.key] = isNaN(style.value) ? style.value : `${style.value}px`;
    }
    return acc;
  }, {});
})

// 把 component.schema.events 从数组转换成对象
const normalizeEvents = computed(() => {
  if (!props.component?.schema?.events) return {};
  const res = props.component.schema.events.reduce((acc, event) => {
    if (event.taskQueue?.length) {
      acc[event.name] = ($event) => {
        $event.stopPropagation();
        $event.preventDefault();
       // Todo: 事件处理
        event.taskQueue.forEach(task => {
          const $task = tasksList.value.find(item => item.id === task.taskId);
          console.log('>>> task: ', $task);
          if ($task.type === 'api') {
            // fetchApi(task.url, task.method, task.query, task.body);
          }
        })
      }
    }
    return acc;
  }, {});
  console.log('>>> normalizeEvents: ', res);
  return res;
})

const componentStyle = computed(() => {
  if (!props.component) return {};
  const style = normalizeStyle.value;
  // 处理百分比
  if (style.width?.includes('%')) {
    style.width = '100%';
  }
  if (style.height?.includes('%')) {
    style.height = '100%';
  }
  return style;
})

const wrapperStyle = computed(() => { 
  if (!props.component) return {};
  if (props.component.categoryType === 'page') {
    return { display: 'block', width: '100%', minHeight: '100%' };
  }
  return { ...normalizeStyle.value };
})
const dataModelList = inject('dataModelList');
const dataBind = reactive({});

const fetchApi = async (url, method, query, body) => {
  try {
    const response = await axios({ method, url });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

const findBindDataModel = () => {
  const dataModelPath = normalizeProps.value.dataModel;
  const dataModelId = dataModelPath.split('.')[0];
  const dataModelFieldType = dataModelPath.split('.')[1];
  const dataModelFieldPath = dataModelPath.split('.').slice(2).join('.');
  const dataModel = dataModelList.value.find(item => item.id === dataModelId);
  if (!dataModel) return {};
  const { url, method } = dataModel;
  return { url, method, dataModelId, dataModelFieldType, dataModelFieldPath };
}

onMounted(async () => {
  if (dataModelList.value.length) {
    for (const key in normalizeProps.value) {
      // 字段动态绑定
      if (key === 'field') {
        // dataBind[normalizeProps.value[key]] = '';
      }
      // 数据模型动态绑定
      if (key === 'dataModel') {
        const { url, method, dataModelFieldType, dataModelFieldPath } = findBindDataModel();
        if (!url || !method) return;
        const res = await fetchApi(url, method)
        if (!res) return;
        if (dataModelFieldType === 'response') {
          dataBind[normalizeProps.value['field']] = _.get(res, dataModelFieldPath);
        }
      }
    }
  }
})

// 监听 activeComponentNode.schema
watch(
  () => props.activeComponentNode?.schema,
  (schema) => {
    if (!schema) return;
    setTimeout(() => {
      const { component, activeComponentNode } = props;
      const elem = elementRef.value;
      // 获取当前激活的节点，并且更新节点蒙层样式
      if (component.id === activeComponentNode?.id && elem) {
        emit('setActiveNodeMaskStyle', {
          width: `${elem.offsetWidth - 2}px`,
          height: `${elem.offsetHeight - 2}px`,
        });
      }
    }, 0);
  },
  { deep: true, immediate: true },
);
</script>

<style lang="less" scoped>
.preview-renderer {
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  position: relative;
}
</style>
