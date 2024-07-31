<template>
  <div class="layout-container">
    <PlexDesigner :materialConfig="materialConfig"/>
  </div>
</template>

<script>
import PlexDesigner from './components/designer';

export default {
  name: 'App',
  components: {
    PlexDesigner
  },
  data() {
    return {
      // 组件库配置
      materialConfig: [{
        label: 'Element UI',
        libraryName: 'ELEMENT',
        libraryScriptUrl: 'https://unpkg.com/element-ui/lib/index.js',
        libraryStyleUrl: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
      }, {
        label: '自定义组件',
        libraryName: 'plex-ui-vue2',
        libraryScriptUrl: 'http://localhost:3000/plex-ui-vue2/main.2ee55163985051c297a4.umd.js',
        libraryStyleUrl: '',
      }]
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