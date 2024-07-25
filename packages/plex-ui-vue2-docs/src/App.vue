<template>
  <div id="app">
    <div></div>

    <div v-if="PlexUIVue2.isLoaded">
      <PlexButton type="success" @click="handleClick">点我试试</PlexButton>
      <PlexInput placeholder="请输入内容" />
    </div>
    <div v-else>
      正在加载 PlexUIVue2 组件库：{{ PlexUIVue2.jsUrl }}
    </div>

    <div v-if="ElementUI.isLoaded">
      <el-button type="success" @click="handleClick">点我试试</el-button>
      <el-input placeholder="请输入内容" />
      <el-radio v-model="radio" label="1">备选项</el-radio>
      <el-radio v-model="radio" label="2">备选项</el-radio>
    </div>
    <div v-else>
      正在加载 ElementUI 组件库：{{ ElementUI.jsUrl }}
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'App',
  data() {
    return {
      PlexUIVue2: {
        isLoaded: false,
        jsUrl: 'http://localhost:3000/js/plex-ui-vue2.8f4a43b7d39fb17285db.umd.js' // 放到本地静态文件服务器测试即可
      },
      ElementUI: {
        isLoaded: false,
        jsUrl: 'https://unpkg.com/element-ui/lib/index.js',
        cssUrl: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
      }
    };
  },
  methods: {
    loadStyle (url) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      document.head.appendChild(link);
    },
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
    async loadElementUI() {
      try {
        await this.loadScript(this.ElementUI.jsUrl);
        if (window.ELEMENT) {
          console.log('>>> ElementUI: ', window.ELEMENT);
          this.$options.components[window.ELEMENT.Button.name] = window.ELEMENT.Button;
          this.$options.components[window.ELEMENT.Input.name] = window.ELEMENT.Input;
          this.$options.components[window.ELEMENT.Radio.name] = window.ELEMENT.Radio;
          this.ElementUI.isLoaded = true;
        } else {
          console.error('ELEMENT 字段不在 window 对象中');
        }
      } catch (err) {
        console.error('ElementUI 组件库脚本加载失败:', err);
      }
    },

    async loadPlexUIVue2() {
      try {
        await this.loadScript(this.PlexUIVue2.jsUrl);
        if (window.PlexUIVue2) {
          console.log('>>> PlexUIVue2: ', window.PlexUIVue2);
          this.$options.components[window.PlexUIVue2.PlexButton.name] = window.PlexUIVue2.PlexButton;
          this.$options.components[window.PlexUIVue2.PlexInput.name] = window.PlexUIVue2.PlexInput;
          this.PlexUIVue2.isLoaded = true;
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
  async mounted() {
    // ElementUI 需要手动挂载 Vue 构造函数，自研的PlexUIVue2组件库不需要
    window.Vue = Vue
    await this.loadStyle(this.ElementUI.cssUrl)
    this.loadPlexUIVue2();
    this.loadElementUI();
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