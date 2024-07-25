<template>
  <div class="plex-input" :class="{ 'is-disabled': disabled }">
    <span v-if="prefixIcon" class="plex-input__prefix-icon">
      <i :class="prefixIcon"></i>
    </span>
    <input
      v-model="inputValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @input="updateValue"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span v-if="clearable && inputValue" class="plex-input__clear" @click="clearInput">
      <i class="icon-clear"></i>
    </span>
    <span v-if="suffixIcon" class="plex-input__suffix-icon">
      <i :class="suffixIcon"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'PlexInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    prefixIcon: {
      type: String,
      default: ''
    },
    suffixIcon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputValue: this.value
    };
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    },
    clearInput() {
      this.inputValue = '';
      this.$emit('input', '');
    },
    handleFocus(event) {
      this.$emit('focus', event);
    },
    handleBlur(event) {
      this.$emit('blur', event);
    }
  },
  watch: {
    value(newVal) {
      this.inputValue = newVal;
    }
  }
};
</script>

<style scoped>
.plex-input {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.plex-input.is-disabled {
  background-color: #f5f7fa;
  cursor: not-allowed;
}

.plex-input input {
  flex: 1;
  border: none;
  outline: none;
}

.plex-input__prefix-icon,
.plex-input__suffix-icon {
  margin-right: 8px;
  font-size: 16px;
}

.plex-input__clear {
  cursor: pointer;
  margin-left: 8px;
}

.plex-input__clear .icon-clear::before {
  content: "\f00d"; /* Assume using FontAwesome or similar */
}

.plex-input__prefix-icon i,
.plex-input__suffix-icon i {
  font-size: 16px;
}
</style>
