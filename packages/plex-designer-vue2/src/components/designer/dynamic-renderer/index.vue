<!-- 渲染器入口 -->
<template>
  <div class="dynamic-renderer">
    <div class="component-wrapper"
      v-for="(component, index) in componentsTree"
      :class="{ 'active': activeComponentNode && activeComponentNode.id === component.id }"
      :style="handleWrapperStyle(component)"
      :key="component.id"
      :ref="component.id">
      <!-- 组件蒙层 -->
      <div class="component-mask"
        :style="component.maskStyle"
        @click.stop="handleComponentNodeClick(component)">
        <div class="component-mask-tools" v-if="component.id === activeComponentNode?.id && component.categoryType !== 'page'">
          <Tooltip content="下移" placement="bottom" v-show="index !== componentsTree.length - 1">
            <Icon type="ios-arrow-round-down" @click="handleComponentNodeMoveDown(component)"/>
          </Tooltip>
          <Tooltip content="上移" placement="bottom" v-show="index !== 0">
            <Icon type="ios-arrow-round-up" @click="handleComponentNodeMoveUp(component)"/>
          </Tooltip>
          <Tooltip content="删除" placement="bottom">
            <Icon type="ios-trash-outline" @click="handleComponentNodeDelete(component)"/>
          </Tooltip>
        </div>
      </div>
      <!-- 组件 -->
      <component
        :is="component.type"
        :ref="'component-' + component.id"
        v-model="bindData[handleProps(component.schema.props || [])['v-model']]"
        v-bind="handleProps(component.schema.props || [])"
        :style="handleInnerStyle(component)">
        <!-- 递归渲染子组件 -->
        <DynamicRenderer
          v-if="component.children && component.children.length"
          :componentsTree="component.children"
          :activeComponentNode="activeComponentNode"
          @onComponentNodeClick="$emit('onComponentNodeClick', $event)"
          @onComponentNodeMoveDown="$emit('onComponentNodeMoveDown', $event)"
          @onComponentNodeMoveUp="$emit('onComponentNodeMoveUp', $event)"
          @onComponentNodeDelete="$emit('onComponentNodeDelete', $event)"
          @setActiveNodeMaskStyle="$emit('setActiveNodeMaskStyle', $event)"/>
        <template v-else-if="component.label">
          {{ component.label }}
        </template>
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
      default: () => null
    }
  },
  data () {
    return {
      activeNodeMaskStyle: {
        width: '',
        height: ''
      },
      bindData: {
        textValue: ''
      }
    }
  },
  methods: {
    handleComponentNodeClick (componentNode) {
      this.$emit('onComponentNodeClick', componentNode)
    },
    handleComponentNodeMoveDown (componentNode) {
      this.$emit('onComponentNodeMoveDown', componentNode)
    },
    handleComponentNodeMoveUp (componentNode) {
      this.$emit('onComponentNodeMoveUp', componentNode)
    },
    handleComponentNodeDelete (componentNode) {
      this.$emit('onComponentNodeDelete', componentNode)
    },
    handleWrapperStyle (componentNode) {
      if (!componentNode) return {}
      if (componentNode.categoryType === 'page') {
        return {
          'display': 'block !important',
          'width': '100%',
          'min-height': '100%'
        }
      } else {
        const componentStyle = this.handleStyle(componentNode.schema.style || []);
        return {
          width: componentStyle.width || 'auto',
          height: componentStyle.height || 'auto',
          display: componentStyle.display || 'auto',
        }
      }
    },
    handleInnerStyle (componentNode) {
      if (!componentNode) return {}
      if (componentNode.categoryType === 'container') {
        const componentStyle = this.handleStyle(componentNode.schema.style || []);
        return {
          ...componentStyle,
          width: '100%',
          height: '100%'
        }
      } else {
        const componentStyle = this.handleStyle(componentNode.schema.style || []);
        return {
          ...componentStyle
        }
      }
    },
    // 处理props
    handleProps (originPropsArray) {
      if (!originPropsArray) return {}
      
      const res = originPropsArray.reduce((obj, prop) => {
        obj[prop.key] = prop.value;
        return obj;
      }, {})
      return res
    },
    handleStyle (originStyleArray) {
      // Todo: 逻辑需要优化，比如清除颜色类、尺寸类值归零时的处理逻辑
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
    'activeComponentNode.schema': {
      handler (val) {
        if (!val) return
        setTimeout(() => {
          const elem = this.$refs[this.activeComponentNode.id]
          if (elem) {
            this.$emit('setActiveNodeMaskStyle', {
              width: (elem[0].children[1].offsetWidth - 2) + 'px', // 减 2 是因为激活状态的节点蒙层上下左右各有1px的边框
              height: (elem[0].children[1].offsetHeight - 2) + 'px'
            })
          }
        }, 0)
      },
      deep: true,
      immediate: true
    },
    bindData: {
      handler (val) {
        if (!val) return
        console.log('>>> designer bindData changed: ', val)
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
  vertical-align: top;
  position: relative;
  .component-mask {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
  &.active {
    &>.component-mask {
      outline: #2d8cf0 solid 1px;
    }
  }
  .component-mask-tools {
    position: absolute;
    right: -1px;
    box-sizing: border-box;
    height: 24px;
    top: -24px;
    padding: 2px;
    background: #2d8cf0;
    color: #fff;
    .ivu-icon {
      font-size: 16px;
    }
  }
}
</style>