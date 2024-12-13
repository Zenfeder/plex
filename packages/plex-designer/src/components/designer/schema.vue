<!-- 右侧组件配置栏 -->
<template>
  <div class="design-schema">
    <el-tabs class="tabs-wrapper" v-model="activeTab">
      <el-tab-pane
        v-for="tab in tabCategories"
        :label="tab.label"
        :key="tab.value"
        :name="tab.value">
        <!-- 样式配置 -->
        <template v-if="activeTab === 'style'">
          <div class="props-item" v-for="item in $style" :key="item.key">
            <div class="label">{{ item.label }}:</div>
            <template v-if="item.type === 'string'">
              <template v-if="item.options && item.options.length">
                <el-select class="form-item" v-model="item.value">
                  <el-option v-for="option in item.options" :value="option" :key="option">{{ option }}</el-option>
                </el-select>
              </template>
              <template v-else>
                <el-input class="form-item" v-model="item.value"/>
              </template>
            </template>
            <template v-else-if="item.type === 'number'">
              <el-input class="form-item" v-model="item.value" type="number"/>
            </template>
            <template v-else-if="item.type === 'boolean'">
              <el-switch v-model="item.value" />
            </template>
            <template v-else-if="item.type === 'color'">
              <el-color-picker v-model="item.value" />
            </template>
          </div>
        </template>
        <!-- 属性配置 -->
        <template v-if="activeTab === 'props'">
          <div class="props-item" v-for="item in $props" :key="item.key">
            <div class="label">{{ item.label }}:</div>
            <template v-if="item.type === 'string'">
              <template v-if="item.options && item.options.length">
                <el-select class="form-item" v-model="item.value">
                  <el-option v-for="option in item.options" :value="option" :key="option">{{ option }}</el-option>
                </el-select>
              </template>
              <template v-else>
                <el-input class="form-item" v-model="item.value" />
              </template>
            </template>
            <template v-else-if="item.type === 'number'">
              <el-input class="form-item" v-model="item.value" type="number"/>
            </template>
            <template v-else-if="item.type === 'boolean'">
              <el-switch v-model="item.value" />
            </template>
          </div>
        </template>
        <!-- 事件配置 -->
        <template v-if="activeTab === 'events'">事件配置</template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';

// Props
const props = defineProps({
	activeComponentNode: {
		type: Object,
		default: () => null
	}
});

const tabCategories = ref([
  {
    label: '样式',
    value: 'style',
  },
  {
    label: '属性',
    value: 'props',
  }
])

const activeTab = ref('style')
const $style = ref([])
const $events = ref([])
const $props = ref([])

// Watch
watch(
  () => props.activeComponentNode?.schema,
  (val) => {
    if (!val) return
      const { props: _props, style: _style, events: _events } = val
      _props && ($props.value = [..._props]);
      _style && ($style.value = [..._style]);
      _events && ($events.value = [..._events]);
    },
  {
    deep: true,
    immediate: true
  }
)

const parseSchemeProps =  function (_props) {}
const parseSchemeStyle = function (_style) {}
const parseSchemeEvents = function (_events) {}
</script>

<style lang="less" scoped>
@input-width: 180px;

.design-schema {
  box-sizing: border-box;
  padding: 10px 0;
  border-left: 1px solid #f5f5f5;
  box-shadow: -2px 0 20px 0 rgba(0, 0, 0, .1);
  background: #fff;

  .tabs-wrapper {
    width: 100%;
    height: 100%;
  }
  .form-item {
    width: @input-width;
  }
  .props-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 10px;
    .label {
      display: block;
      width: 120px;
      padding-right: 10px;
      text-align: right;
    }
  }
}
</style>