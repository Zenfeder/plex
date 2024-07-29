# `plex-elementui-adaptor`

> Element UI 组件库适配器

## 用法

### 安装依赖
`npm i plex-elementui-adaptor -S`


### 使用示例

``` javascript
<template>
  <div id="app">
    <div v-if="isLoaded">
      <h3>ElementUI:</h3>
      <el-button @click="handleClick">点我试试</el-button>
    </div>
    <div v-else>
      <p>正在加载 ElementUI 组件库...</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
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
  async mounted() {
    // 全局注册组件库
    await loadElementUI({
      libraryName: 'ELEMENT',
      libraryScriptUrl: 'https://unpkg.com/element-ui/lib/index.js',
      libraryStyleUrl: 'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
      register: Vue, // 局部注册传 this
    });
    this.isLoaded = true
  },
};
</script>
```

### 作用
异步加载和注册 ElementUI 组件库，并将 Element UI 组件库适配为 Plex 低代码系统组件规范，自动注入 schema 与 material 等组件信息。
