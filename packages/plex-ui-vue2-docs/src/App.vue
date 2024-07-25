<template>
  <div id="app">
    <h1>PlexUI 组件库预览</h1>
    <div>
      <plex-button type="success">Plex 按钮</plex-button>
      <plex-input  v-model="inputValue" placeholder="请输入内容"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      inputValue: ''
    };
  }
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>