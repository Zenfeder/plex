<!-- 右侧组件配置栏 -->
<template>
  <div class="designer-schema">
    <Tabs class="sidebar-tabs">
        <TabPane
          v-for="tab in tabCategories"
          :label="tab.label"
          :name="tab.label"
          :key="tab.value">
          {{ tab.label }}
        </TabPane>
      </Tabs>
  </div>
</template>

<script>
export default {
  name: 'PdSchema',
  props: {
    activeComponentNode: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      tabCategories: [{
        label: '属性',
        value: 'props',
      }, {
        label: '样式',
        value: 'style',
      }, {
        label: '事件',
        value: 'events'
      }],
      activeTab: 'props',
    };
  },
  watch: {
    activeComponentNode: {
      handler (val) {
        console.log('>>> activeComponentNode changed: ', val)
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>

.designer-schema {
  box-sizing: border-box;
  padding: 10px 0;
  border-left: 1px solid #f5f5f5;
  box-shadow: -2px 0 20px 0 rgba(0, 0, 0, .1);
  background: #fff;
}
</style>