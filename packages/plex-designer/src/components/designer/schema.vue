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
          <div class="schema-item" v-for="item in $style" :key="item.key">
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
          <div class="schema-item" v-for="item in $props" :key="item.key">
            <div class="label">{{ item.label }}:</div>
            <template v-if="item.hasOwnProperty('bindDataModel')">
              <el-tree-select
                class="form-item"
                v-model="item.bindDataModel"
                :data="dataModelTree"
                :render-after-expand="false"
                placement="left-start"
                @change="handleDataModelChange"
              ></el-tree-select>
            </template>
            <template v-else>
              <template v-if="item.type === 'boolean'">
                <el-switch v-model="item.value" />
              </template>
              <template v-else>
                <template v-if="item.options && item.options.length">
                  <el-select class="form-item" v-model="item.value">
                    <el-option v-for="option in item.options" :value="option" :key="option">{{ option }}</el-option>
                  </el-select>
                </template>
                <template v-else>
                  <el-input class="form-item" v-model="item.value" />
                </template>
              </template>
            </template>
          </div>
        </template>
        <!-- 事件配置 -->
        <template v-if="activeTab === 'events'">
          <div style="text-align: center;margin-bottom: 10px;"><el-button type="primary" @click="addEvent" size="small">添加事件</el-button></div>
          <el-collapse v-model="activeEventNames">
            <el-collapse-item v-for="(event, eventIndex) in $events" :key="eventIndex" :name="eventIndex">
              <template #title>
                <el-popconfirm title="知道你自己在干啥吧？" hide-icon @confirm="removeEvent(eventIndex)">
                  <template #reference>
                    <el-button type="danger" link @click.stop>删除事件</el-button>
                  </template>
                </el-popconfirm>
              </template>
              <div class="event-item">
                <el-row :gutter="20">
                  <el-col :span="21">
                    <el-select v-model="event.name" placeholder="请选择事件类型">
                      <el-option
                        v-for="type in eventsEnums"
                        :key="type.key"
                        :label="type.label"
                        :value="type.key"/>
                    </el-select>
                  </el-col>
                </el-row>

                <div style="text-align: center;margin-top: 10px;"><el-button type="success" @click="addTask(eventIndex)" size="small">绑定任务</el-button></div>
                <div v-for="(task, taskIndex) in event.taskQueue" :key="taskIndex" class="task-item">
                  <el-row>
                    <el-col :span="14">
                      <el-select v-model="task.taskId" placeholder="选择任务">
                        <el-option
                          v-for="taskOption in tasksList"
                          :key="taskOption.id"
                          :label="taskOption.name"
                          :value="taskOption.id"
                        />
                      </el-select>
                    </el-col>
                    <el-col :span="8">
                      <el-select v-model="task.type" placeholder="是否异步">
                        <el-option
                          v-for="taskTypeOption in taskTypeEnums"
                          :key="taskTypeOption.value"
                          :label="taskTypeOption.label"
                          :value="taskTypeOption.value"
                        />
                      </el-select>
                    </el-col>
                    <el-col :span="2">
                      <el-popconfirm title="知道你自己在干啥吧？" hide-icon @confirm="removeTask(eventIndex, taskIndex)">
                        <template #reference>
                          <el-button type="danger" :icon="Delete" circle size="small"/>
                        </template>
                      </el-popconfirm>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { computed, ref, watch, inject } from 'vue';
import { Delete } from '@element-plus/icons-vue'
import eventsEnums from '../../utils/eventEnums';
import taskTypeEnums from '../../utils/taskTypeEnums';

// Props
const props = defineProps({
	activeComponentNode: {
		type: Object,
		default: () => {}
	}
});

const dataModelList = inject('dataModelList');
const tasksList = inject('tasksList');

const emit = defineEmits([
  'onSchemaChange'
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
const $props = ref([])
const $style = ref([])
const $events = ref([])
const activeEventNames = ref([0])

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
    ["response"].forEach((key) => {
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

const handleDataModelChange = (value) => {
  // value 为选中的值，如 qBN8ouEo9PyFNGDE.response.data.address
  console.log('>>> handleDataModelChange value: ', value);
}

// 添加新事件
const addEvent = () => {
  $events.value.push({
    name: '', // 事件类型
    taskQueue: [], // 任务队列
  });
}
// 删除事件
const removeEvent = (eventIndex) => {
  $events.value.splice(eventIndex, 1);
}
// 添加任务到指定事件
const addTask = (eventIndex) => {
  $events.value[eventIndex].taskQueue.push({
    taskId: '', // 任务id
    type: taskTypeEnums[0].value, // 同步/异步
  });
}
// 删除指定任务
const removeTask = (eventIndex, taskIndex) => {
  $events.value[eventIndex].taskQueue.splice(taskIndex, 1);
}

watch(
  () => props.activeComponentNode?.id,
  (newVal) => {
    if (!newVal) return
    const { schema } = props.activeComponentNode
    $props.value = JSON.parse(JSON.stringify(schema?.props || []))
    $style.value = JSON.parse(JSON.stringify(schema?.style || []))

    // 事件特殊处理
    if (!schema?.events) {
      schema.events = [] // 用于存储动态添加的事件及其任务队列
    }
    const tempEvents = JSON.parse(JSON.stringify(schema.events))
    $events.value = tempEvents.map(item => {
      // 如果没有任务队列，就初始化一个空数组
      if (!item.taskQueue) {
        item.taskQueue = []
      }
      return item
    })
  },
  {
    immediate: true
  }
)

watch(
  () => $props,
  (newVal) => {
    emit('onSchemaChange', {
      id: props.activeComponentNode.id,
      key: 'props',
      value: JSON.parse(JSON.stringify(newVal.value))
    })
  },
  { deep: true }
)
watch(
  () => $style,
  (newVal) => {
    emit('onSchemaChange', {
      id: props.activeComponentNode.id,
      key: 'style',
      value: JSON.parse(JSON.stringify(newVal.value))
    })
  },
  { deep: true }
)
watch(
  () => $events,
  (newVal) => {
    emit('onSchemaChange', {
      id: props.activeComponentNode.id,
      key: 'events',
      value: JSON.parse(JSON.stringify(newVal.value))
    })
  },
  { deep: true }
)
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
  .schema-item {
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
  .event-item {
    box-sizing: border-box;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #e4e4e4;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  .task-item {
    margin-top: 10px;
    padding: 10px;
    border: 1px dashed #dcdcdc;
    border-radius: 5px;
    background-color: #f5f5f5;
  }
}
</style>