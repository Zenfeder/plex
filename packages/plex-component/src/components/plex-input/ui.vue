<template>
  <input class="plex-input"
    :value="showValue"
    :type="type"
    :placeholder="placeholder"
    @input="handleChange"/>
</template>

<script>
export default {
  name: 'PlexInput',
  model: {
    event: 'input'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  computed: {},
  data() {
    return {
      showValue: ''
    };
  },
  watch: {
    value: {
      handler(newVal) {
        this.showValue = newVal
        console.log('>>> plex-input value: ', newVal)
      },
      immediate: true
    }
  },
  methods: {
    handleChange(event) {
      this.showValue = event.target.value
      this.$emit('input', this.showValue)
      console.log('>>> plex-input showValue: ', this.showValue)
    }
  },
}
</script>

<style scoped lang="less">
.plex-input {
  width: 100%;
  height: 36px;
}
</style>