<template>
  <div class="design-canvas">
    <template v-if="!refresh">
      <DesignRenderer
        v-for="(component, index) in componentsTree"
        :key="component.id"
        :component="component"
        :index="index"
        :siblingLength="componentsTree.length"
        :activeComponentNode="activeComponentNode"
        :style="{ 'width': '100%', 'min-height': '100%' }"
        @onComponentNodeClick="$emit('onComponentNodeClick', $event)"
        @onComponentNodeMoveDown="$emit('onComponentNodeMoveDown', $event)"
        @onComponentNodeMoveUp="$emit('onComponentNodeMoveUp', $event)"
        @onComponentNodeDelete="$emit('onComponentNodeDelete', $event)"
        @setActiveNodeMaskStyle="$emit('setActiveNodeMaskStyle', $event)"/>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import _ from 'lodash';
import DesignRenderer from './renderer';

// Props
const props = defineProps({
	componentsTree: {
		type: Array,
		default: () => []
	},
	activeComponentNode: {
		type: Object,
		default: () => null
	}
});

// 解决浏览器窗口大小变化，画布宽度不更新问题
const refresh = ref(false);
window.onresize = _.debounce(() => {
  refresh.value = true;
  setTimeout(() => {
    refresh.value = false;
  }, 0);
}, 100);
</script>

<style lang="less" scoped>
.design-canvas {
  box-sizing: border-box;
  padding: 20px 5px 5px 5px;
  background: #f7f7f9;
}
</style>