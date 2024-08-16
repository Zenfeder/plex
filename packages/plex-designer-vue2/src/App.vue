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
        // 远程组件
        {
          libraryName: 'ELEMENT',
          libraryScriptUrl: 'http://localhost:3000/element-ui@2.15.14/index.js',
          libraryStyleUrl: 'http://localhost:3000/element-ui@2.15.14/index.css',
        },
        // 本地开发自定义组件
        {
          libraryName: 'plex-ui-vue2',
          library: PlexUIVue,
          material,
          schemas
        },
        // {
        //   libraryName: 'plex-ui-vue2',
        //   libraryScriptUrl: 'http://localhost:3000/plex-ui-vue2/main.200664fef5b9b358b892.umd.js',
        //   libraryStyleUrl: '',
        // }
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