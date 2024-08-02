<!-- 布局容器 -->
<template>
  <div class="plex-container-layout">
    <div class="plex-layout-item" :style="colStyle" v-for="i in Number(columns)" :key="i">
      <slot>第 {{ i }} 列</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlexLayoutContainer',
  props: {
    columns: {
      type: [Number, String],
      default: 4
    },
    colHeight: {
      type: Number,
      default: 200
    }
  },
  computed: {
    colStyle() {
      return {
        height: `${this.colHeight}px`
      };
    }
  }
};
</script>

<style scoped lang="less">
.plex-container-layout {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .plex-layout-item {
    flex: 1;
    text-align: center;
  }
}
</style>
  