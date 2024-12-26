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
            <template v-if="item.key === 'dataModel'">
              <el-tree-select
                class="form-item"
                v-model="item.value"
                :data="dataModelTree"
                :render-after-expand="false"
                placement="left-start"
              ></el-tree-select>
            </template>
            <template v-else>
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
import { computed, ref, watch, inject } from 'vue';

// Props
const props = defineProps({
	activeComponentNode: {
		type: Object,
		default: () => null
	}
});

const dataModelList = inject('dataModelList');

const emit = defineEmits([
  'onPropsChange',
]);

const tabCategories = ref([
  {
    label: '样式',
    value: 'style',
  },
  {
    label: '属性',
    value: 'props',
  },
  {
    label: '事件',
    value: 'events',
  }
])

const activeTab = ref('style')
const $style = ref([])
const $events = ref([])
const $props = ref([])

function transformToTreeSelect(dataModel) {
  // 递归转换函数
  function transformFields(fields, prefix) {
    if (!fields) return [];
    return fields.map((field) => {
      const node = {
        value: `${prefix}.${field.name}`,
        label: field.name,
      };
      if (field.children && field.children.length > 0 && field.type === "object") {
        node.children = transformFields(field.children, node.value);
      }
      return node;
    });
  }

  // 主转换逻辑
  return dataModel.map((item) => {
    const rootNode = {
      value: item.id,
      label: item.name,
      children: [],
    };

    // 将 query, body, response 转换为树结构
    ["query", "body", "response"].forEach((key) => {
      if (item[key] && item[key].length > 0) {
        rootNode.children.push({
          value: `${item.id}.${key}`,
          label: key,
          children: transformFields(item[key], `${item.id}.${key}`),
        });
      }
    });

    return rootNode;
  });
}

const dataModelTree = computed(() => {
  return transformToTreeSelect(dataModelList.value)
})

// Watch
watch(
  () => props.activeComponentNode?.schema,
  (newVal) => {
    // newVal 和 oldVal 值一直是一样的，因为他们是同一个对象，这是 Vue 设计缺陷
    if (!newVal) return
    if (newVal?.props) {
      $props.value = [...newVal?.props]
      emitSchemeProps(newVal?.props)
    }
    if (newVal?.style) {
      $style.value = [...newVal?.style]
      emitSchemeStyle(newVal?.style)
    }
    if (newVal?.events) {
      $events.value = [...newVal?.events]
      emitSchemeEvents(newVal?.events)
    }
  },
  {
    deep: true,
    immediate: true
  }
)

const emitSchemeProps =  function (newVal) {
  if (!newVal || !newVal.length) return
  const newProps = newVal.reduce((acc, prop) => {
    acc[prop.key] = prop.value;
    return acc;
  })
  emit('onPropsChange', props.activeComponentNode, newProps)
}
const emitSchemeStyle = function (_style) {}
const emitSchemeEvents = function (_events) {}
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