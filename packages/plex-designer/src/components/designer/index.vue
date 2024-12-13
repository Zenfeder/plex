<!-- 设计器入口 -->
<template>
  <div class="design-container">
    <pd-toolbar
      @onPreview="handlePreview"/>
    <div class="design-body" v-if="isLoaded">
      <pd-material class="material-box"
        :materialList="materialList"
        :componentsTree="componentsTree"
        :activeComponentNode="activeComponentNode"
        @onComponentItemClick="handleMaterialClick"
        @onCodeNodeClick="handleCodeNodeClick"
        @onOutlineNodeClick="handleOutlineNodeClick"/>

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

<script setup>
const props = defineProps({
  materialConfig: Array
})
import { getCurrentInstance, onMounted, ref, computed } from 'vue';
import { registerVue3ComponentDynamic } from 'plex-core';
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
import _ from 'lodash';

const emit = defineEmits([
  'onPreview'
]);

const instance = getCurrentInstance();
let isLoaded = ref(false);
let materialList = ref([]);
let componentsTree = ref([]);
let activeComponentNodeId = ref('');

const activeComponentNode = computed(() => {
  return findComponentNodeById(componentsTree.value, activeComponentNodeId.value);
})

// 加载并挂载组件素材库
const loadMaterials = async function(materialConfig) {
  try {
    materialList.value = [...materialConfig];
    for (let i = 0; i < materialList.value.length; i++) {
      const targetLib = materialList.value[i];
      
      if (targetLib.library && !targetLib.libraryScriptUrl) {
        if (instance && instance.appContext && instance.appContext.app) {
          instance.appContext.app.use(targetLib.library);
        }
      } else if (targetLib.libraryScriptUrl) {
        // 通过远程地址安装依赖
        const lib = await registerVue3ComponentDynamic({
          libraryName: targetLib.libraryName,
          libraryScriptUrl: targetLib.libraryScriptUrl,
          libraryStyleUrl: targetLib.libraryStyleUrl,
          app: instance.appContext.app,
        });
        targetLib.material = lib.material;
        targetLib.schemas = lib.schemas;
      } else {
        console.error(`组件库 ${targetLib.libraryName} 配置缺少 library 或 libraryScriptUrl`);
      }
    }
    isLoaded.value = true;
  } catch (err) {
    console.error(err);
  }
}

const handleComponentNodeClick = function (componentNode) {
  activeComponentNodeId.value = componentNode.id
}
const handleCodeNodeClick = function (nodeData) {
  const matchs = nodeData.path.match(/(children\[\d+\](?:\.children\[\d+\])*)/)
  if (matchs) {
    const path = matchs[0]
    const componentNode = _.get(componentsTree.value[0], path)
    if (componentNode.parentId && componentNode.id) {
      activeComponentNodeId.value = componentNode.id
    }
  } else {
    activeComponentNodeId.value = componentsTree.value[0].id
  }
}
const handleOutlineNodeClick = function (nodeData) {
  activeComponentNodeId.value = nodeData.id
}
const handleSetActiveNodeMaskStyle = function (style) {
  const activeNode = findComponentNodeById(componentsTree.value, activeComponentNodeId.value);
  activeNode.maskStyle = style
}
const handleComponentNodeMoveDown = function (componentNode) {
  componentsTree.value = swapWithNextSibling(componentsTree.value, componentNode.id);
}
const handleComponentNodeMoveUp = function (componentNode) {
  componentsTree.value = swapWithPreviousSibling(componentsTree.value, componentNode.id);
}
const handleComponentNodeDelete = function (componentNode) {
  componentsTree.value = deleteComponentNodeById(componentsTree.value, componentNode.id);
}

// 将新组件节点添加到画布
const addComponentNodeToCanvas = function (newComponentNode) {
  const activeNode = findComponentNodeById(componentsTree.value, activeComponentNodeId.value);
  if (!componentsTree.value.length) {
    componentsTree.value.push(newComponentNode);
  } else if (activeNode) {
    if (activeNode.categoryType === 'container' || activeNode.categoryType === 'page') {
      newComponentNode.parentId = activeNode.id;
      activeNode.children.push(newComponentNode);
    } else {
      newComponentNode.parentId = activeNode.parentId;
      insertAfterSibling(componentsTree.value, activeNode.id, newComponentNode);
    }
  }
  activeComponentNodeId.value = newComponentNode.id
}

// 点击组件库中的组件
const handleMaterialClick = function ({ libraryName, categoryIndex, componentIndex }) {
  // 在 materialList 中找到对应的组件，并将组件信息注入 componentsTree 组件树中
  const targetLib = materialList.value.find(item => item.libraryName === libraryName)
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

    addComponentNodeToCanvas(newComponentNode);
  }
}

const handlePreview = function () {
  emit('onPreview', componentsTree.value);
}

const initPage = function () {
  // Todo: 待优化，这里默认第一项是系统组件库，并且默认把第一个组件（plex-page）加入到画布中，考虑做成配置化？
  handleMaterialClick({
    libraryName: materialList.value[0].libraryName,
    categoryIndex: 0,
    componentIndex: 0
  })
}

onMounted(async() => {
  await loadMaterials(props.materialConfig);
  initPage();
});
</script>

<style lang="less" scoped>
@height-header: 50px;
@width-left: 360px;
@width-right: 320px;
@min-width-center: 600px;

.design-container {
  height: 100vh;
  overflow: hidden;
}

.design-body {
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