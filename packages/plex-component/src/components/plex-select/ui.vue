<template>
  <div class="plex-select">
    <label>{{ label }}</label>
    <select v-model="model" :placeholder="placeholder">
      <option v-for="option in options" :value="option[optionValue]">{{ option[optionName] }}</option>
    </select>
  </div>
</template>

<script setup>
defineOptions({
  name: 'PlexSelect'
})

const model = defineModel()

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  optionName: {
    type: String,
    default: ''
  },
  optionValue: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped lang="less">
.plex-select {
  margin-bottom: 16px;
  label {
    display: block;
    margin-bottom: 4px;
    font-weight: bold;
  }
  select {
    box-sizing: border-box;
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
</style>
