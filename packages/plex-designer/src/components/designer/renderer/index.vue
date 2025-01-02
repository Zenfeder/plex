<template>
  <div class="design-renderer"
    ref="elementRef"
    :style="wrapperStyle">
    <!-- 组件蒙层 -->
    <ComponentMask
      :isActive="isActiveComponent(component)"
      :showTooltip="isActiveComponent(component) && component.categoryType !== 'page'"
      :index="index"
      :siblingLength="siblingLength"
      :component="component"
      @maskClick="handleComponentNodeClick"
      @moveUp="handleComponentNodeMoveUp"
      @moveDown="handleComponentNodeMoveDown"
      @delete="handleComponentNodeDelete"
    />
    <!-- 渲染组件 -->
    <component
      :is="component.type"
      :style="componentStyle"
      v-bind="normalizeProps"
    >
      <!-- 递归渲染子组件 -->
      <template v-if="component.children?.length">
        <DesignRenderer
          v-for="($component, $index) in component.children"
          :key="$component.id"
          :index="$index"
          :component="$component"
          :siblingLength="component.children.length"
          :activeComponentNode="activeComponentNode"
          @onComponentNodeClick="$emit('onComponentNodeClick', $event)"
          @onComponentNodeMoveDown="$emit('onComponentNodeMoveDown', $event)"
          @onComponentNodeMoveUp="$emit('onComponentNodeMoveUp', $event)"
          @onComponentNodeDelete="$emit('onComponentNodeDelete', $event)"
          @setActiveNodeMaskStyle="$emit('setActiveNodeMaskStyle', $event)"
        />
      </template>
      <template v-else-if="normalizeProps.slot">{{ normalizeProps.slot }}</template>
      <template v-else-if="component.label">{{ component.label }}</template>
    </component>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import ComponentMask from './component-mask.vue';

defineOptions({
  name: 'DesignRenderer'
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
const isActiveComponent = (component) => {
  return component.id === props.activeComponentNode?.id;
};

const handleComponentNodeClick = (component) => {
  emit('onComponentNodeClick', component);
};

const handleComponentNodeMoveDown = (component) => {
  emit('onComponentNodeMoveDown', component);
};

const handleComponentNodeMoveUp = (component) => {
  emit('onComponentNodeMoveUp', component);
};

const handleComponentNodeDelete = (component) => {
  emit('onComponentNodeDelete', component);
};

const initPropsValue = () => {
  if (!props.component?.schema?.props) return;
  props.component.schema.props.forEach(prop => {
    prop.value = prop.defaultValue;
  });
}

const initStyleValue = () => {
  if (!props.component?.schema?.style) return;
  props.component.schema.style.forEach(style => {
    style.value = style.defaultValue;
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
.design-renderer {
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  position: relative;
  min-width: 60px;
}
</style>
