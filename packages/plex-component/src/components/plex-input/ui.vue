<template>
  <div class="plex-input">
    <label>{{ label }}</label>
    <input v-model="model" :placeholder="placeholder" :type="type"/>
  </div>
</template>

<script setup>
defineOptions({
  name: 'PlexInput'
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
  type: {
    type: String,
    default: 'text'
  }
});
</script>

<style scoped lang="less">
.plex-input {
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
