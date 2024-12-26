<template>
  <div class="form-item">
    <label>{{ label }}</label>
    <input v-model="value"
      :placeholder="placeholder"
      :type="type"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({
  name: 'PlexInput'
})

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  }
});

const emit = defineEmits([ 'update:modelValue', 'field-change' ]);

// 双向绑定逻辑
const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val);
    // emit('field-change', { field: props.field, value: val });
  }
});
</script>

<style scoped lang="less">
.form-item {
  margin-bottom: 16px;
  label {
    display: block;
    margin-bottom: 4px;
    font-weight: bold;
  }
  input {
    box-sizing: border-box;
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
</style>
