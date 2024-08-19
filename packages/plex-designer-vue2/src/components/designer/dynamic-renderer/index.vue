<!-- 渲染器入口 -->
<template>
  <div class="dynamic-renderer">
    <div class="component-wrapper"
      v-for="(component, index) in componentsTree"
      :class="{ 'active': activeComponentNode && activeComponentNode.id === component.id }"
      :style="component.categoryType === 'page' ? 'display:block !important; width: 100%; min-height: 100%;' : ''"
      :key="component.id"
      :ref="component.id">
      <!-- 组件蒙层 -->
      <div class="component-mask"
        :style="component.maskStyle"
        @click.stop="handleComponentNodeClick(component)">
        <div class="component-mask-tools" v-if="component.id === activeComponentNode?.id && component.categoryType !== 'page'">
          <Tooltip content="下移" placement="top" v-show="index !== componentsTree.length - 1">
            <Icon type="ios-arrow-round-down" @click="handleComponentNodeMoveDown(component)"/>
          </Tooltip>
          <Tooltip content="上移" placement="top" v-show="index !== 0">
            <Icon type="ios-arrow-round-up" @click="handleComponentNodeMoveUp(component)"/>
          </Tooltip>
          <Tooltip content="删除" placement="top">
            <Icon type="ios-trash-outline" @click="handleComponentNodeDelete(component)"/>
          </Tooltip>
        </div>
      </div>
      <!-- 组件 -->
      <component
        :is="component.type"
        :ref="'component-' + component.id"
        v-bind="handleProps(component.schema.props || [])"
        :style="handleStyle(component.schema.style || [])">
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
    'activeComponentNode.schema': {
      handler (val) {
        if (!val) return
        setTimeout(() => {
          const elem = this.$refs[this.activeComponentNode.id]
          if (elem) {
            this.$emit('setActiveNodeMaskStyle', {
              width: elem[0].children[1].offsetWidth + 'px',
              height: elem[0].children[1].offsetHeight + 'px'
            })
          }
        }, 0)
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.dynamic-renderer {
  display: flex;
  flex-direction: column; /* 强制每个元素占据一行 */
  align-items: flex-start; /* 保持元素宽度自适应内容 */
}
.component-wrapper {
  display: inline-block;
  cursor: pointer;
  position: relative;
  text-align: right;
  .component-mask {
    padding-top: 20px;
    position: absolute;
    left: 0;
    top: 0;
    // text-align: left;
  }
  &.active>.component-mask {
    // border: 1px solid #2d8cf0;
    outline: #2d8cf0 solid 1px;
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