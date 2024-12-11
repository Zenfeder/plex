<!-- 顶部工具栏 -->
<template>
  <div class="designer-toolbar">
    <div class="toolbar-left">Plex Designer3</div>
    <div class="toolbar-center"></div>
    <div class="toolbar-right"></div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'PdToolbar'
})
</script>

<style lang="less" scoped>
@height-header: 50px;
@width-left: 360px;
@width-right: 260px;
@min-width-center: 600px;

.designer-toolbar {
  box-sizing: border-box;
  height: @height-header;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  background: #fff;
  border-bottom: 1px solid #e8e9eb;
  .toolbar-left {
    box-sizing: border-box;
    height: 100%;
    width: @width-left;
    padding: 10px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
  }
  .toolbar-center {
    height: 100%;
    flex: 1;
    min-width: @min-width-center;
  }
  .toolbar-right {
    box-sizing: border-box;
    height: 100%;
    width: @width-right;
    padding: 10px;
  }
}
</style>