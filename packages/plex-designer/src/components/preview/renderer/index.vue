<template>
  <div class="preview-renderer"
    ref="elementRef"
    :style="wrapperStyle">
    <!-- 渲染组件 -->
    <component
      :is="component.type"
      :style="componentStyle"
      v-bind="normalizeProps"
      v-model="dataBind[`${component.id}.${normalizeProps.field}`]"
      v-on="normalizeEvents"
    >
      <!-- 递归渲染子组件 -->
      <template v-if="component.children?.length">
        <PreviewRenderer
          v-for="$component in component.children"
          :key="$component.id"
          :component="$component"
          @onCustomEvent="handleCustomEvent"/>
      </template>
      <template v-else-if="normalizeProps.slot">{{ normalizeProps.slot }}</template>
      <template v-else-if="component.label">{{ component.label }}</template>
    </component>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, inject } from 'vue';
import axios from 'axios';
import _ from 'lodash';

defineOptions({
  name: 'PreviewRenderer'
});

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
  'onCustomEvent',
]);

const dataModelList = inject('dataModelList');
const dataBind = inject('dataBind');

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
        emit('onCustomEvent', {
          eventName: event.name,
          taskQueue: event.taskQueue,
          event: $event,
        })
        $event.stopPropagation();
        $event.preventDefault();
      }
    }
    return acc;
  }, {});
  return res;
})

const handleCustomEvent = ({ eventName, taskQueue, event }) => {
  emit('onCustomEvent', {
    eventName,
    taskQueue,
    event,
  })
}

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

const fetchApi = async (url, method, query, body) => {
  try {
    const response = await axios({ method, url });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// const findBindDataModel = (dataModelValue) => {
//   const dataModelValue = normalizeProps.value.dataModel;
//   if (!dataModelValue) return {};
//   // dataModelPath 的格式示例：hWzC3X1M5wgbr5s2.response.data.username
//   const dataModelId = dataModelValue.split('.')[0];
//   const dataModelFieldType = dataModelValue.split('.')[1];
//   const dataModelFieldPath = dataModelValue.split('.').slice(2).join('.');
//   const dataModel = dataModelList.value.find(item => item.id === dataModelId);
//   if (!dataModel) return {};
//   const { url, method } = dataModel;
//   return { url, method, dataModelId, dataModelFieldType, dataModelFieldPath };
// }

// onMounted(async () => {
//   if (dataModelList.value.length) {
//     for (const key in normalizeProps.value) {
//       // 数据模型动态绑定
//       if (key === 'dataModel') {
//         const { url, method, dataModelFieldType, dataModelFieldPath } = findBindDataModel();
//         if (!url || !method) return;
//         const res = await fetchApi(url, method)
//         if (!res) return;
//         if (dataModelFieldType === 'response') {
//           dataBind[`${props.component.id}.${normalizeProps.value['field']}`] = _.get(res, dataModelFieldPath);
//         }
//       }
//     }
//   }
// })

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
