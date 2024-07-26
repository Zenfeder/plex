<template>
  <div id="app">
    <h3>plex-ui-vue2-docs</h3>
    <PlexButton type="success" @click="handleClick">点我试试</PlexButton>
    <PlexInput placeholder="请输入内容" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {};
  },
  methods: {
    handleClick() {
      alert('你还真点');
    }
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