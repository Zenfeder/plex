<template>
  <div class="layout-container">
    <div class="layout-left"></div>
    <div class="layout-center"></div>
    <div class="layout-right"></div>
  </div>
</template>

<script>
import loadElementUI from 'plex-elementui-adaptor'; 

export default {
  name: 'App',
  data() {
    return {
      isLoaded: false
    };
  },
  methods: {
    handleClick() {
      alert('你还真点啊!');
    }
  },
  async created() {
    await loadElementUI({
      libraryName: 'ELEMENT',
      libraryScriptUrl: 'https://unpkg.com/element-ui/lib/index.js',
      libraryStyleUrl: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
      register: this,
    });
    this.isLoaded = true
  },
};
</script>


<style lang="less">
.layout-container {
  height: 100vh;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  .layout-left {
    box-sizing: border-box;
    height: 100%;
    width: 260px;
    padding: 10px;
    border-right: 1px solid #f5f5f5;
    box-shadow: 2px 0 20px 0 rgba(0, 0, 0, .1);
  }
  .layout-center {
    height: 100%;
    flex: 1;
    background: #f7f7f9;
  }
  .layout-right {
    box-sizing: border-box;
    height: 100%;
    width: 260px;
    padding: 10px;
    border-left: 1px solid #f5f5f5;
    box-shadow: -2px 0 20px 0 rgba(0, 0, 0, .1);
  }
}
</style>