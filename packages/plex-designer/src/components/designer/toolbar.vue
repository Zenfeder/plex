<!-- 顶部工具栏 -->
<template>
  <div class="design-toolbar">
    <div class="toolbar-left">Plex Designer3</div>
    <div class="toolbar-center">
      <el-button size="small" @click="$emit('onSetDataModel')">数据模型配置</el-button>
      <el-button size="small" @click="$emit('onSetTasks')">任务配置</el-button>
    </div>
    <div class="toolbar-right">
      <el-button type="primary" size="small" @click="$emit('onPreview')">预览</el-button>
      <el-button type="primary" size="small" @click="$emit('onSave')">保存</el-button>
    </div>
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

.design-toolbar {
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
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .toolbar-right {
    box-sizing: border-box;
    height: 100%;
    width: @width-right;
    padding: 10px;
  }
}
</style>