<template>
  <Designer
    :materialConfig="materialConfig"
    @onPreview="handlePreview"/>

  <!-- 预览弹窗 -->
  <el-dialog
    v-if="dialogPreviewVisible"
    v-model="dialogPreviewVisible"
    title="页面"
    :fullscreen="true"
  >
    <Preview :componentsTree="componentsTree" />
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import Designer from './components/designer';
import Preview from './components/preview';

const dialogPreviewVisible = ref(false);
const componentsTree = ref({});

defineOptions({
  name: 'PlexDesigner'
});

const props = defineProps({
  materialConfig: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits([
  'onPreview'
]);

const handlePreview = (data) => {
  componentsTree.value = data;
  dialogPreviewVisible.value = true;
  emit('onPreview', componentsTree.value);
}
</script>