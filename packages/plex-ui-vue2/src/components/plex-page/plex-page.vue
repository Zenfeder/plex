<!-- 页面容器 -->
<template>
  <div class="plex-page">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PlexPage',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {},
  watch: {
    title: {
      handler(newVal) {
        document.title = newVal;
      },
      immediate: true
    }
  },
};
</script>

<style scoped lang="less">
.plex-page {
  padding: 10px;
}
</style>
  