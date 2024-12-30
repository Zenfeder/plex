<template>
  <div class="preview-container">
    <PreviewRenderer
      v-for="component in componentsTree"
      :key="component.id"
      :component="component"
      :style="{ 'width': '100%', 'min-height': '100%' }"/>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import _ from 'lodash';
import PreviewRenderer from './renderer';

const componentsTree = inject('componentsTree');
const dataModelList = inject('dataModelList');
const tasksList = inject('tasksList');

// 收集组件树中所有的数据模型调用
const collectAllDataModel = () => {}

// 加载数据模型
const loadDataModel = async () => {}

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