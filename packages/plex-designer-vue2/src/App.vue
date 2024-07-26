<template>
  <div id="app">
    <h2>Plex Designer</h2>

    <div v-if="isLoaded">
      <h3>PlexUIVue2：</h3>
      <PlexButton type="success" @click="handleClick">点我试试</PlexButton>
      <PlexInput placeholder="请输入内容" />

      <h3>PlexUIVue2：</h3>
      <el-button type="primary" @click="handleClick">点我试试</el-button>
      <el-input placeholder="请输入内容" />
    </div>
    <div v-else>
      <p>正在加载 PlexUIVue2 和 ElementUI 组件库...</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import registerVueComponentLibraryDynamic from './utils/library-loader'; 

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
  async mounted() {
    // 局部注册
    await registerVueComponentLibraryDynamic({
      libraryName: 'PlexUIVue2',
      libraryScriptUrl: 'http://localhost:3000/js/plex-ui-vue2.c7bce9211df9b0ef9457.umd.js',
      register: Vue,
    });

    // 全局注册
    await registerVueComponentLibraryDynamic({
      libraryName: 'ELEMENT',
      libraryScriptUrl: 'https://unpkg.com/element-ui/lib/index.js',
      libraryStyleUrl: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
      register: this,
      needWindowVue: true // ElementUI 一直需要 window.Vue
    });
    this.isLoaded = true
  },
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