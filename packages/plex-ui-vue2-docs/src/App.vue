<template>
  <div id="app">
    <div v-if="isLoaded">
      <PlexButton type="success" @click="handleClick">点我试试</PlexButton>
      <PlexInput placeholder="请输入内容" />
    </div>
    <div v-else>
      正在加载 PlexUIVue2 组件库：{{ PlexUIVue2LibUrl }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoaded: false,
      PlexUIVue2LibUrl: 'http://localhost:3000/js/plex-ui-vue2.8f4a43b7d39fb17285db.umd.js'
    };
  },
  methods: {
    loadScript(url) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    },
    async loadPlexUI() {
      try {
        await this.loadScript(this.PlexUIVue2LibUrl);
        if (window.PlexUIVue2) {
          console.log('>>> PlexUIVue2: ', window.PlexUIVue2);
          this.$options.components.PlexButton = window.PlexUIVue2.PlexButton;
          this.$options.components.PlexInput = window.PlexUIVue2.PlexInput;
          this.isLoaded = true;
        } else {
          console.error('PlexUIVue2 字段不在 window 对象中');
        }
      } catch (err) {
        console.error('PlexUIVue2 组件库脚本加载失败:', err);
      }
    },
    handleClick() {
      alert('你还真点啊!');
    }
  },
  mounted() {
    this.loadPlexUI();
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