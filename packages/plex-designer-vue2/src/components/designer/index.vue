<!-- 设计器入口 -->
<template>
  <div class="designer-container">
    <pd-toolbar/>
    <div class="designer-body" v-if="isLoaded">
      <pd-material class="material-box"
        :materailList="materailList"/>
      <pd-canvas class="canvas-box"/>
      <pd-schema class="schema-box"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import registerElementUIDynamic from 'plex-elementui-adaptor';
import { registerVueComponentLibraryDynamic } from 'plex-core';
import PdToolbar from './toolbar.vue';
import PdMaterial from './material.vue';
import PdCanvas from './canvas/index.vue';
import PdSchema from './schema.vue';

export default {
  name: 'PlexDesigner',
  components: {
    PdToolbar,
    PdMaterial,
    PdCanvas,
    PdSchema
  },
  props: {
    materialConfig: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      isLoaded: false,
      materailList: []
    }
  },
  methods: {
    async loadComponentLib() {
      this.materailList = [...this.materialConfig]
      this.$Loading.start();
      for (let i = 0; i < this.materailList.length; i++) {
        const targetLib = this.materailList[i]
        if (!targetLib || targetLib.library) return
        if (targetLib.libraryName === 'ELEMENT') {
          // Element UI 适配后组件库动态注册
          const lib = await registerElementUIDynamic({
            libraryName: targetLib.libraryName,
            libraryScriptUrl: targetLib.libraryScriptUrl,
            libraryStyleUrl: targetLib.libraryStyleUrl,
            register: Vue,
          });
          this.$set(targetLib, 'library', lib);
        } else {
          // 自定义组件库动态注册
          const lib = await registerVueComponentLibraryDynamic({
            libraryName: targetLib.libraryName,
            libraryScriptUrl: targetLib.libraryScriptUrl,
            libraryStyleUrl: targetLib.libraryStyleUrl,
            register: Vue,
          })
          this.$set(targetLib, 'library', lib);
        }
      }
      this.$Loading.finish();
      this.isLoaded = true
    }
  },
  async created() {
    this.loadComponentLib();
  },
};
</script>


<style lang="less" scoped>
@height-header: 50px;
@width-left: 360px;
@width-right: 260px;
@min-width-center: 600px;

.designer-container {
  height: 100vh;
  overflow: hidden;
}

.designer-body {
  height: calc(100vh - @height-header);
  display: flex;
  flex-direction: row;
  overflow: hidden;
  .material-box {
    width: @width-left;
    height: 100%;
  }
  .canvas-box {
    height: 100%;
    flex: 1;
    min-width: @min-width-center;
  }
  .schema-box {
    width: @width-right;
    height: 100%;
  } 
}
</style>