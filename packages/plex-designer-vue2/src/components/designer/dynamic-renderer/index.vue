<!-- 渲染器入口 -->
<template>
  <div>
    <div class="component-wrapper"
      v-for="component in componentsTree"
      :class="{ 'active': activeComponentNode.id === component.id }"
      :key="component.id"
      @click="handleComponentNodeClick(component)">
      <component
        :is="component.type"
        v-bind="handleProps(component.schema.props)"
        :style="handleStyle(component.schema.style)">
        <!-- 递归渲染子组件 -->
        <DynamicRenderer v-if="component.children" :componentsTree="component.children" />
        <template v-else-if="component.label">{{ component.label }}</template>
      </component>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DynamicRenderer',
  props: {
    componentsTree: {
      type: Array,
      default: () => []
    },
    activeComponentNode: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleComponentNodeClick (componentNode) {
      this.$emit('onComponentNodeClick', componentNode);
    },
    // 处理props
    handleProps (originPropsArray) {
      if (!originPropsArray) return {}
      
      return originPropsArray.reduce((obj, prop) => {
        obj[prop.key] = prop.value;
        return obj;
      }, {})
    },
    handleStyle (originStyleArray) {
      if (!originStyleArray) return {}
      
      return originStyleArray.reduce((obj, style) => {
        if (style.value || !isNaN(style.value)) {
          obj[style.key] = !isNaN(style.value) ? style.value + 'px' : style.value; // 判断是否为数字
        }
        return obj;
      }, {})
    }
  },
  watch: {
    componentsTree: {
      handler (val) {
        console.log('>>> componentsTree changed: ', JSON.parse(JSON.stringify(val)))
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
.component-wrapper {
  cursor: pointer;
  display: inline-block;
  padding: 5px;
  position: relative;
  &.active {
    border: 1px solid #2b85e4;
  }
}
</style>