<!-- 画布入口 -->
<template>
  <div class="designer-canvas">
    <DynamicRenderer
      :style="{ height: '100%' }"
      :componentsTree="componentsTree"
      :activeComponentNode="activeComponentNode"
      @onComponentNodeClick="$emit('onComponentNodeClick', $event)"
      @onComponentNodeMoveDown="$emit('onComponentNodeMoveDown', $event)"
      @onComponentNodeMoveUp="$emit('onComponentNodeMoveUp', $event)"
      @onComponentNodeDelete="$emit('onComponentNodeDelete', $event)"
      @setActiveNodeMaskStyle="$emit('setActiveNodeMaskStyle', $event)"/>
  </div>
</template>

<script>
import DynamicRenderer from './dynamic-renderer';

export default {
  name: 'PdCanvas',
  components: {
    DynamicRenderer
  },
  props: {
    componentsTree: {
      type: Array,
      default: () => []
    },
    activeComponentNode: {
      type: Object,
      default: () => null
    }
  }
};
</script>

<style lang="less" scoped>
.designer-canvas {
  box-sizing: border-box;
  padding: 20px 10px;
  background: #f7f7f9;
}
</style>