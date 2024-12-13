<template>
  <div class="preview-renderer"
    ref="elementRef"
    :style="getWrapperStyle(component)">
    <!-- 渲染组件 -->
    <component
      :is="component.type"
      :style="getComponentStyle(component)"
      v-bind="normalizeProps(component.schema.props)"
    >
      <!-- 递归渲染子组件 -->
      <template v-if="component.children?.length">
        <PreviewRenderer
          v-for="$component in component.children"
          :key="$component.id"
          :component="$component"/>
      </template>
      <template v-else-if="component.label">{{ component.label }}</template>
    </component>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';

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
]);

// 方法

const normalizeProps = (propsArray) => {
  if (!propsArray) return {};
  return propsArray.reduce((acc, prop) => {
    acc[prop.key] = prop.value;
    return acc;
  }, {});
};

const normalizeStyle = (styleArray) => {
  if (!styleArray) return {};
  return styleArray.reduce((acc, style) => {
    if (style.value !== undefined && style.value !== null) {
      acc[style.key] = isNaN(style.value) ? style.value : `${style.value}px`;
    }
    return acc;
  }, {});
};

const getWrapperStyle = (component) => {
  if (!component) return {};
  if (component.categoryType === 'page') {
    return { display: 'block', width: '100%', minHeight: '100%' };
  }
  return normalizeStyle(component.schema?.style || []);
};

const getComponentStyle = (component) => {
  if (!component) return {};
  const style = normalizeStyle(component.schema?.style || []);
  if (style.width?.includes('%')) {
    style.width = '100%';
  }
  if (style.height?.includes('%')) {
    style.height = '100%';
  }
  return style;
};

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
