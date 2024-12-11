<template>
  <div :class="{ 'active': isActive, 'component-mask': true }"
    :style="component.maskStyle"
    @click.stop="$emit('maskClick', component)">
    <div class="component-mask-tools" v-if="showTooltip">
      <el-tooltip content="下移" placement="bottom" v-if="index !== siblingLength - 1">
        <el-icon @click="$emit('moveDown', component)">
          <ArrowDown />
        </el-icon>
      </el-tooltip>
      <el-tooltip content="上移" placement="bottom" v-if="index !== 0">
        <el-icon @click="$emit('moveUp', component)">
          <ArrowUp />
        </el-icon>
      </el-tooltip>
      <el-tooltip content="删除" placement="bottom">
        <el-icon @click="$emit('delete', component)">
          <Delete />
        </el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  showTooltip: {
    type: Boolean,
    default: false,
  },
  component: {
    type: Object,
    default: () => {},
  },
  siblingLength: {
    type: Number,
    default: 0,
  },
  index: {
    type: Number,
    default: 0,
  }
});
</script>

<style lang="less" scoped>
.component-mask {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  &.active {
    outline: #2d8cf0 solid 1px;
  }
  .component-mask-tools {
    position: absolute;
    right: -1px;
    box-sizing: border-box;
    height: 24px;
    top: -26px;
    padding: 2px;
    background: #2d8cf0;
    color: #fff;
    display: flex; /* 使用 Flex 布局 */
    align-items: center;
    flex-wrap: nowrap; /* 禁止换行 */
    gap: 4px; /* 增加工具项间距 */
    z-index: 10; /* 提高层级，防止被遮挡 */

    .el-icon {
      font-size: 16px;
      flex-shrink: 0; /* 禁止缩小图标 */
      cursor: pointer;
    }
  }
}
</style>
