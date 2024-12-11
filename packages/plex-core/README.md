# `plex-core`

> plex核心通用核心模块

## 用法

### 安装依赖
`npm i plex-core -S`


### 使用示例

``` javascript
<template>
  <div id="app">
    <div v-if="isLoaded">
      <h3>PlexUIVue2：</h3>
      <plex-button type="success" @click="handleClick">点我试试</plex-button>

      <h3>ElementUI:</h3>
      <el-button @click="handleClick">点我试试</el-button>
    </div>
    <div v-else>
      <p>正在加载 PlexUIVue2 和 ElementUI 组件库...</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { registerVue2ComponentDynamic } from 'plex-core'; 

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
    // 全局注册组件库
    await registerVue2ComponentDynamic({
      libraryName: 'PlexUIVue2',
      libraryScriptUrl: 'http://localhost:3000/js/plex-ui-vue2.c7bce9211df9b0ef9457.umd.js',
      register: Vue, // 全局注册组件库
    });

    // 局部注册组件库
    await registerVue2ComponentDynamic({
      libraryName: 'ELEMENT',
      libraryScriptUrl: 'https://unpkg.com/element-ui/lib/index.js',
      libraryStyleUrl: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
      register: this, // 局部注册组件库
      needWindowVue: true  // 因 ElementUI 组件库设计原因，必须在组件库脚本加载完成之前，window 对象上有 Vue 构造函数
    });
    this.isLoaded = true
  },
};
</script>
```

### 作用
异步加载与注册组件库，支持符合 plex-ui-vue2 组件规范的组件库和开源组件库（比如 Element UI、Antd 等）。
