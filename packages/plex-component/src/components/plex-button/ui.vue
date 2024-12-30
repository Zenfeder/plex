<template>
  <button :class="buttonClasses">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'PlexButton',
  props: {
    type: {
      type: String,
      default: 'default',
      validator: value => ['default', 'primary', 'success', 'warning', 'danger'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonClasses() {
      return [
        'p-button',
        `p-button--${this.type}`,
        {
          'is-disabled': this.disabled,
          'is-loading': this.loading
        }
      ];
    }
  },
  methods: {
    handleClick(event) {
      if (this.disabled) {
        event.preventDefault();
        return;
      }
      this.$emit('click', event);
    }
  }
};
</script>

<style scoped>
.p-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  font-size: 14px;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.p-button--default {
  background-color: #fff;
  border-color: #dcdfe6;
  color: #606266;
}

.p-button--primary {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
}

.p-button--success {
  background-color: #67c23a;
  border-color: #67c23a;
  color: #fff;
}

.p-button--warning {
  background-color: #e6a23c;
  border-color: #e6a23c;
  color: #fff;
}

.p-button--danger {
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: #fff;
}

.p-button.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.p-button.is-loading::before {
  content: ' ';
  display: inline-block;
  margin-right: 5px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-right-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
  