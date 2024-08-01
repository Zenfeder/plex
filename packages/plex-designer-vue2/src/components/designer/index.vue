<!-- 设计器入口 -->
<template>
  <div class="designer-container">
    <pd-toolbar/>
    <div class="designer-body" v-if="isLoaded">
      <pd-material class="material-box"
        :materialList="materialList"
        @onComponentItemClick="handleMaterialClick"/>

      <pd-canvas class="canvas-box"
        :componentsTree="componentsTree"
        :activeComponentNode="activeComponentNode"
        @onComponentNodeClick="handleCanvasNodeClick"/>

      <pd-schema class="schema-box"
        :activeComponentNode="activeComponentNode"/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import registerElementUIDynamic from 'plex-elementui-adaptor';
import { registerVueComponentLibraryDynamic } from 'plex-core';
import PdToolbar from './toolbar.vue';
import PdMaterial from './material.vue';
import PdCanvas from './canvas.vue';
import PdSchema from './schema.vue';

import { generateRandomString } from '../../utils/common';

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
      materialList: [],
      componentsTree: [],
      activeComponentId: '',
      activeComponentNode: null
    }
  },
  methods: {
    async loadComponentLib() {
      this.$Loading.start();
      try {
        this.materialList = [...this.materialConfig]
        for (let i = 0; i < this.materialList.length; i++) {
          const targetLib = this.materialList[i]
          if (!targetLib || targetLib.library) return
          const methodName = targetLib.libraryName === 'ELEMENT' ? registerElementUIDynamic : registerVueComponentLibraryDynamic;
          const lib = await methodName({
            libraryName: targetLib.libraryName,
            libraryScriptUrl: targetLib.libraryScriptUrl,
            libraryStyleUrl: targetLib.libraryStyleUrl,
            register: Vue,
          });
          this.$set(targetLib, 'material', lib.material);
          this.$set(targetLib, 'schemas', lib.schemas);
        }
        this.$Loading.finish();
        this.isLoaded = true;
      } catch (err) {
        this.$Loading.error();
        console.error(err);
      }
    },
    handleMaterialClick ({ libraryName, categoryIndex, componentIndex }) {
      console.log(libraryName, categoryIndex, componentIndex)
      // 在 materialList 中找到对应的组件，并将组件信息注入 componentsTree 组件树中
      const targetLib = this.materialList.find(item => item.libraryName === libraryName)
      if (targetLib) {
        const targetComponent = targetLib.material.categoryList[categoryIndex].children[componentIndex];
        const targetSchema = JSON.parse(JSON.stringify(targetLib.schemas[targetComponent.type]));

        const newComponentNode = {
          id: generateRandomString(),
          libraryName,
          categoryIndex,
          ...targetComponent,
          schema: {
            props: [...targetSchema.props],
            style: [ ...targetSchema.style ],
            events: [ ...targetSchema.events],
          }
        };
        this.componentsTree.push(newComponentNode);

        this.activeComponentNode = newComponentNode;
      }
    },
    handleCanvasNodeClick (node) {
      this.activeComponentNode = node;
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
@width-right: 360px;
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