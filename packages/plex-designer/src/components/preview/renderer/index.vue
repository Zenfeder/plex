<template>
  <div class="preview-renderer"
    ref="elementRef"
    :style="wrapperStyle">
    <!-- 渲染组件 -->
    <component
      :is="component.type"
      :style="componentStyle"
      v-bind="normalizeProps"
      v-model="dataBind[`${component.id}.modelValue`]"
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

const dataBind = inject('dataBind');

const initPropsValue = () => {
  if (!props.component?.schema?.props) return;
  props.component.schema.props.forEach(prop => {
    if (prop.hasOwnProperty('bindDataModel') && prop.value) {
      prop.value = undefined;
    } else {
      prop.value = prop.value === undefined ? prop.defaultValue : prop.value;
    }
  });
}
const initStyleValue = () => {
  if (!props.component?.schema?.style) return;
  props.component.schema.style.forEach(style => {
    if (style.hasOwnProperty('bindDataModel') && style.value) {
      style.value = undefined;
    } else {
      style.value = style.value === undefined ? style.defaultValue : style.value;
    }
  });
}
initPropsValue();
initStyleValue();

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
