<template>
  <div class="layout-container">
    <PlexDesigner :materialConfig="materialConfig"/>
  </div>
</template>

<script setup>
import PlexDesigner from './components/designer';
// 本地开发自定义组件
import PlexUIVue from 'plex-ui-vue3';
import { material, schemas } from 'plex-ui-vue3';

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
</script>


<style lang="less" scoped>
.layout-container {
  height: 100vh;
  overflow: hidden;
}
</style>