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
        @onComponentNodeClick="handleComponentNodeClick"
        @onComponentNodeMoveDown="handleComponentNodeMoveDown"
        @onComponentNodeMoveUp="handleComponentNodeMoveUp"
        @onComponentNodeDelete="handleComponentNodeDelete"
        @setActiveNodeMaskStyle="handleSetActiveNodeMaskStyle"/>

      <pd-schema class="schema-box" :activeComponentNode="activeComponentNode"/>
    </div>
  </div>
</template>

<script>
import registerElementUIDynamic from 'plex-elementui-adaptor';
import { registerVueComponentLibraryDynamic } from 'plex-core';
import PdToolbar from './toolbar.vue';
import PdMaterial from './material.vue';
import PdCanvas from './canvas.vue';
import PdSchema from './schema.vue';

import { generateRandomString } from '../../utils/common';
import {
  findComponentNodeById,
  swapWithNextSibling,
  swapWithPreviousSibling,
  insertAfterSibling,
  deleteComponentNodeById
} from '../../utils/component-tree-tools';

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
      activeComponentNodeId: ''
    }
  },
  computed: {
    activeComponentNode() {
      return findComponentNodeById(this.componentsTree, this.activeComponentNodeId);
    }
  },
  async created() {
    await this.loadComponentLib();
    this.initPage();
  },
  methods: {
    // 异步加载与注册组件库
    async loadComponentLib() {
      this.$Loading.start();
      try {
        this.materialList = [...this.materialConfig];
        for (let i = 0; i < this.materialList.length; i++) {
          const targetLib = this.materialList[i];
          
          if (targetLib.library && !targetLib.libraryScriptUrl) {
            // 通过本地npm安装依赖
            this.$root.constructor.use(targetLib.library)
          } else if (targetLib.libraryScriptUrl) {
            // 通过远程地址安装依赖
            const methodName = targetLib.libraryName === 'ELEMENT' ? registerElementUIDynamic : registerVueComponentLibraryDynamic;
            const lib = await methodName({
              libraryName: targetLib.libraryName,
              libraryScriptUrl: targetLib.libraryScriptUrl,
              libraryStyleUrl: targetLib.libraryStyleUrl,
              register: this.$root.constructor,
            });
            this.$set(targetLib, 'material', lib.material);
            this.$set(targetLib, 'schemas', lib.schemas);
          } else {
            console.error(`组件库 ${targetLib.libraryName} 配置缺少 library 或 libraryScriptUrl`);
          }
        }
        this.$Loading.finish();
        this.isLoaded = true;
      } catch (err) {
        this.$Loading.error();
        console.error(err);
      }
    },
    initPage() {
      // Todo: 待优化，这里默认 plex-ui-vue2 是系统组件库，考虑做成配置化？
      this.handleMaterialClick({
        libraryName: 'plex-ui-vue2',
        categoryIndex: 0,
        componentIndex: 0
      })
    },
    handleComponentNodeClick (componentNode) {
      this.activeComponentNodeId = componentNode.id
    },
    handleSetActiveNodeMaskStyle (style) {
      const activeNode = findComponentNodeById(this.componentsTree, this.activeComponentNodeId);
      this.$set(activeNode, 'maskStyle', style)
    },
    handleComponentNodeMoveDown (componentNode) {
      this.componentsTree = swapWithNextSibling(this.componentsTree, componentNode.id);
    },
    handleComponentNodeMoveUp (componentNode) {
      this.componentsTree = swapWithPreviousSibling(this.componentsTree, componentNode.id);
    },
    handleComponentNodeDelete (componentNode) {
      this.componentsTree = deleteComponentNodeById(this.componentsTree, componentNode.id);
    },
    // 将新组件节点添加到画布
    addComponentNodeToCanvas(newComponentNode) {
      const activeNode = findComponentNodeById(this.componentsTree, this.activeComponentNodeId);
      if (!this.componentsTree.length) {
        this.componentsTree.push(newComponentNode);
      } else if (activeNode) {
        if (activeNode.categoryType === 'container' || activeNode.categoryType === 'page') {
          newComponentNode.parentId = activeNode.id;
          activeNode.children.push(newComponentNode);
        } else {
          insertAfterSibling(this.componentsTree, activeNode.id, newComponentNode);
        }
      }
      this.activeComponentNodeId = newComponentNode.id
    },

    // 点击组件库中的组件
    handleMaterialClick ({ libraryName, categoryIndex, componentIndex }) {
      // 在 materialList 中找到对应的组件，并将组件信息注入 componentsTree 组件树中
      const targetLib = this.materialList.find(item => item.libraryName === libraryName)
      if (targetLib) {
        const category = targetLib.material.categoryList[categoryIndex];
        const component = category.children[componentIndex];
        const schema = JSON.parse(JSON.stringify(targetLib.schemas[component.type]));

        const newComponentNode = {
          ...component,
          id: generateRandomString(),
          libraryName,
          categoryIndex,
          categoryType: category.category,
          children: [],
          maskStyle: {},
          schema: {}
        };

        schema.props && (newComponentNode.schema.props = [...schema.props]);
        schema.style && (newComponentNode.schema.style = [...schema.style]);
        schema.events && (newComponentNode.schema.events = [...schema.events]);

        this.addComponentNodeToCanvas(newComponentNode);
      }
    }
  }
};
</script>


<style lang="less" scoped>
@height-header: 50px;
@width-left: 360px;
@width-right: 320px;
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
    min-width: @min-width-center;
    min-height: 100%;
    overflow-y: auto;
    scrollbar-width: none;
    flex: 1;
  }
  .schema-box {
    width: @width-right;
    height: 100%;
  } 
}
</style>