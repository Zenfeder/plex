<template>
  <div class="layout-container">
    <PlexDesigner :materialConfig="materialConfig"/>
  </div>
</template>

<script>
import PlexDesigner from './components/designer';
// 本地开发自定义组件
import PlexUIVue from 'plex-ui-vue2';
import { material, schemas } from 'plex-ui-vue2';

export default {
  name: 'App',
  components: {
    PlexDesigner
  },
  data() {
    return {
      // 组件库配置
      materialConfig: [
        // 本地开发自定义组件
        {
          libraryName: 'plex-ui-vue2',
          library: PlexUIVue,
          material,
          schemas
        },
        // 远程组件
        {
          libraryName: 'ELEMENT',
          libraryScriptUrl: 'http://localhost:3000/element-ui@2.15.14/index.js',
          libraryStyleUrl: 'http://localhost:3000/element-ui@2.15.14/index.css',
        }
      ]
    };
  }
};
</script>


<style lang="less" scoped>
.layout-container {
  height: 100vh;
  overflow: hidden;
}
</style>