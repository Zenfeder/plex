<!-- 画布入口 -->
<template>
  <div class="designer-canvas">
    <DynamicRenderer
      :componentsTree="componentsTree"
      :activeComponentNode="activeComponentNode"
      @onComponentNodeClick="(item) => $emit('onComponentNodeClick', item)"/>
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
      default: () => ({})
    }
  }
};
</script>

<style lang="less" scoped>
.designer-canvas {
  background: #f7f7f9;
}
</style>