<!-- 左侧物料库栏 -->
<template>
  <div class="designer-material">
    <div class="material-sidebar">
      <div class="sidebar-item"
        v-for="sidebarType in sidebarCategories"
        :class="sidebarType.value === activeSidebarCategory ? 'active' : ''"
        :key="sidebarType.value"
        @click="activeSidebarCategory = sidebarType.value">
        <Tooltip :content="sidebarType.label" placement="left">
          <div class="sidebar-item-inner"><Icon :type="sidebarType.icon"/></div>
        </Tooltip>
      </div>
    </div>
    <div class="material-content">
      <!-- 组件 -->
      <template v-if="activeSidebarCategory === 'component'">
        <div class="sidebar-title">组件</div>
        <Tabs>
          <TabPane
            v-for="materialItem in materailList"
            :label="materialItem.label"
            :name="materialItem.libraryName"
            :key="materialItem.libraryName">
            <div class="components-wrap" v-if="materialItem.library && materialItem.library.material">
              <Collapse simple>
                <Panel
                  v-for="categoryItem in materialItem.library.material.categoryList"
                  :key="categoryItem.label"
                  :name="categoryItem.label">
                  {{ categoryItem.label }}
                  <div slot="content" class="components-panel">
                    <div class="component-item"
                      v-for="componentItem in categoryItem.children"
                      :key="componentItem.value"
                      @click="handleComponentItemClick(componentItem)">
                      {{ componentItem.label }}
                    </div>
                  </div>
                </Panel>
              </Collapse>
            </div>
          </TabPane>
        </Tabs>
      </template>
      <!-- 大纲 -->
      <template v-if="activeSidebarCategory === 'outline'">
        <!-- Todo -->
      </template>
      <!-- 代码 -->
      <template v-if="activeSidebarCategory === 'code'">
        <!-- Todo -->
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PdMaterial',
  data() {
    return {
      // 侧边栏分类
      sidebarCategories: [{
        label: '组件',
        value: 'component',
        icon: 'ios-apps'
      }, {
        label: '大纲',
        value: 'outline',
        icon: 'ios-map-outline'
      }, {
        label: '代码',
        value: 'code',
        icon: 'ios-code'
      }],
      activeSidebarCategory: 'component',
    };
  },
  props: {
    materailList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleComponentItemClick (item) {
      console.log(item);
      // 将组件添加到画布
    }
  }
};
</script>


<style lang="less" scoped>
.designer-material {
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
  height: 100%;
  background: #fff;
  border-left: 1px solid #e6e6e8;
}
.sidebar-title {
  padding: 10px;
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