<template>
  <div class="design-material">
    <div class="material-sidebar">
      <div class="sidebar-item"
        v-for="sidebarType in sidebarCategories"
        :class="sidebarType.value === activeSidebarCategory ? 'active' : ''"
        :key="sidebarType.value"
        @click="activeSidebarCategory = sidebarType.value">
        <el-tooltip placement="left" :content="sidebarType.label">
          <div class="sidebar-item-inner">
            <el-icon><component :is="sidebarType.icon"/></el-icon>
          </div>
        </el-tooltip>
      </div>
    </div>
    <div class="material-content">
      <!-- 组件 -->
      <template v-if="activeSidebarCategory === 'component'">
        <div class="sidebar-title">组件</div>
        <el-tabs class="sidebar-tabs" v-model="activeTab">
          <el-tab-pane
            v-for="materialItem in materialList"
            :label="materialItem.material && materialItem.material.label"
            :name="materialItem.libraryName"
            :key="materialItem.libraryName">
            <div class="components-wrap"
              v-if="materialItem.material">
              <el-collapse>
                <template v-for="(categoryItem, categoryIndex) in materialItem.material.categoryList"
                  :key="categoryItem.label">
                  <el-collapse-item
                    v-if="categoryItem.hidden !== true"
                    :title="categoryItem.label">
                    <div class="components-panel">
                      <div class="component-item"
                        v-for="(componentItem, componentIndex) in categoryItem.children"
                        :key="componentItem.type"
                        @click="handleComponentItemClick({
                          libraryName: materialItem.libraryName,
                          categoryIndex,
                          componentIndex
                        })">
                        {{ componentItem.label }}
                      </div>
                    </div>
                  </el-collapse-item>
                </template>
              </el-collapse>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
      
      <!-- 代码 -->
      <template v-if="activeSidebarCategory === 'code'">
        <vue-json-pretty :data="componentsTreeShow" @node-click="handleCodeNodeClick"/>
      </template>

      <!-- 大纲 -->
      <template v-if="activeSidebarCategory === 'outline'">
        <el-tree
          style="max-width: 600px"
          :data="componentsTree"
          :props="outlineTreeProps"
          :default-expand-all="true"
          :expand-on-click-node="false"
          :highlight-current="true"
          :node-key="'id'"
          :current-node-key="activeComponentNode.id"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          @node-click="handleOutlineNodeClick"
        >
          <template #default="{ node, data }">
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="data.id"
              placement="right"
            >
              <span>{{ data.label }}</span>
            </el-tooltip>
          </template>
        </el-tree>
      </template>
    </div>
  </div>
</template>

<script setup>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { reactive, ref, computed, watch } from 'vue';

// Data
const sidebarCategories = reactive([{
	label: '组件',
	value: 'component',
	icon: 'Grid'
}, {
	label: '代码',
	value: 'code',
	icon: 'Cpu'
}, {
	label: '大纲',
	value: 'outline',
	icon: 'MapLocation'
}]);
const activeSidebarCategory = ref('component');
const activeTab = ref('');

// Props
const props = defineProps({
	componentsTree: {
		type: Array,
		default: () => []
	},
  activeComponentNode: {
    type: Object,
    default: () => {}
  },
	materialList: {
		type: Array,
		default: () => []
	}
});

// Computed
const componentsTreeShow = computed(() => {
	function formatComponentTree (item) {
		const node = {
			id: item.id,
			label: item.label,
			type: item.type
		}
		if (item.schema && item.schema.props && item.schema.props.length) {
			node.props = {};
			for (let i = 0; i < item.schema.props.length; i++) {
				node.props[item.schema.props[i].key] = item.schema.props[i].value
			}
		}
		if (item.schema && item.schema.style && item.schema.style.length) {
			node.style = {};
			for (let i = 0; i < item.schema.style.length; i++) {
				node.style[item.schema.style[i].key] = item.schema.style[i].value
			}
		}
		if (item.children && item.children.length) {
			node.children = [];
			for (let i = 0; i < item.children.length; i++) {
				node.children.push(formatComponentTree(item.children[i]));
			}
		}
		return node;
	}
	return [formatComponentTree(props.componentsTree[0])];
})

const emit = defineEmits(['onComponentItemClick', 'onCodeNodeClick', 'onOutlineNodeClick']);

const outlineTreeProps = {
  children: 'children',
  label: 'label',
}

// Methods
const handleComponentItemClick = function({ libraryName, categoryIndex, componentIndex }) {
	emit('onComponentItemClick', {
		libraryName,
		categoryIndex,
		componentIndex
	})
	// 将组件添加到画布
}

const handleCodeNodeClick = function(componentNode) {
	emit('onCodeNodeClick', componentNode)
}
const handleOutlineNodeClick = function(componentNode) {
  emit('onOutlineNodeClick', componentNode)
}
const allowDrop = (draggingNode, dropNode, type) => {
  const { categoryType } = dropNode.data
  if (categoryType === 'page') {
    return type === 'inner'
  } else if (categoryType === 'container') {
    return true
  } else {
    return type !== 'inner'
  }
}
const allowDrag = (draggingNode) => {
  // 根节点不允许拖拽
  return draggingNode.data.parentId
}

watch(
  () => props.materialList,
  (val) => {
    if (!val) return
    activeTab.value = val[0].libraryName
  },
  {
    immediate: true,
  }
)

</script>

<style lang="less" scoped>
.design-material {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border-right: 1px solid #f5f5f5;
  box-shadow: 2px 0 20px 0 rgba(0, 0, 0, .1);
  display: flex;
}
.material-sidebar {
  height: 100%;
  width: 50px;
  background: #fff;
  .sidebar-item {
    box-sizing: border-box;
    height: 50px;
    width: 50px;
    border-left: 3px solid #fff;
    background: #fff;
    font-size: 20px;
    cursor: pointer;
    &:hover {
      color: #409EFF;
      background: #eef3fe;
      border-left: 3px solid #eef3fe;
    }
    &.active {
      color: #409EFF;
      border-left: 3px solid #2468f2;
      background: #eef3fe;
    }
  }
  .sidebar-item-inner {
    box-sizing: border-box;
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.material-content {
  flex: 1;
  min-height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
  background: #fff;
  border-left: 1px solid #e6e6e8;
}
.sidebar-title {
  padding: 10px;
}
.sidebar-tabs {
  width: 100%;
  overflow: hidden;
} 
.components-wrap {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 5px 10px;
  .components-panel {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
  }
  .component-item {
    border: 1px solid #e8e9eb;
    width: 112px;
    height: 32px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 2px 12px 10px;
    cursor: pointer;
    &:hover {
      border: 1px solid #5cadff;
    }
  }
}
</style>