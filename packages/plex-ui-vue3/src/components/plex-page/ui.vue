<!-- 页面容器 -->
<template>
  <div class="plex-page">
    <!-- 测试组件 -->
    <slot name="default">页面容器</slot>
  </div>
</template>

<script setup>
import { watch } from 'vue';

defineOptions({
  name: 'PlexPage'
})

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})

watch(
  () => props.title,
  (newVal) => {
    document.title = newVal
  },
  {
    immediate: true
  }
)
</script>

<style scoped lang="less">
.plex-page {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
}
</style>
  