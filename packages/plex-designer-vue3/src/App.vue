<template>
  <div class="layout-container">
    <PlexDesigner
      :materialConfig="materialConfig"
      @onPreview="handlePreview"/>
  </div>
  
  <!-- 预览弹窗 -->
  <el-dialog
    v-if="dialogPreviewVisible"
    v-model="dialogPreviewVisible"
    title="预览"
    :fullscreen="true"
  >
    <PlexPreview :componentsTree="componentsTree" />
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import PlexDesigner from './components/designer';
import PlexPreview from './components/preview';
// 本地开发自定义组件
import PlexUIVue from 'plex-ui-vue3';
import { material, schemas } from 'plex-ui-vue3';

const dialogPreviewVisible = ref(false)
const componentsTree = ref({})

const materialConfig = [
  // 本地开发自定义组件
  {
    libraryName: 'plex-ui-vue3',
    library: PlexUIVue,
    material,
    schemas
  }
  // 远程组件
  // {
  //   libraryName: 'ELEMENT',
  //   libraryScriptUrl: 'http://localhost:3000/element-ui@2.15.14/index.js',
  //   libraryStyleUrl: 'http://localhost:3000/element-ui@2.15.14/index.css',
  // }
]
// return materialConfig

const handlePreview = (data) => {
  console.log('>>> handlePreview: ', data)
  componentsTree.value = data
  dialogPreviewVisible.value = true
}
</script>


<style lang="less" scoped>
.layout-container {
  height: 100vh;
  overflow: hidden;
}
</style>