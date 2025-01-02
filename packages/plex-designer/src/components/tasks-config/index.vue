<template>
  <div class="data-field">
    <el-button type="primary" size="small" @click="handleAddTask">添加任务</el-button>
    <el-table :data="tasksList" style="width: 100%">
      <el-table-column prop="id" label="任务ID"/>
      <el-table-column prop="name" label="任务名称"/>
      <el-table-column prop="type" label="任务类型">
        <template #default="scope">
         {{ taskEnums.find(item => item.value === scope.row.type)?.label }}
        </template>
      </el-table-column>
      <el-table-column prop="method" label="绑定数据模型">
        <template #default="scope">
          {{ dataModelList.find(item => item.id === scope.row.dataModelId)?.name }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="120">
        <template #default="scope">
          <el-popconfirm title="知道你自己在干啥吧？" hide-icon @confirm="handleDeleteTask(scope.row)">
            <template #reference>
              <el-button link type="primary" size="small">删除</el-button>
            </template>
          </el-popconfirm>
          <el-button link type="primary" size="small" @click="handleEditTask(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    v-model="dialogAddVisible"
    :title="dialogTitle"
    width="800px">
    <el-form label-width="120px">
      <el-form-item label="任务名称">
        <el-input class="task-form-item" v-model="taskForm.name" placeholder="请输入任务名称"></el-input>
      </el-form-item>
      <el-form-item label="任务类型">
        <el-select class="task-form-item" v-model="taskForm.type" placeholder="请选择任务类型">
          <el-option v-for="item in taskEnums" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="taskForm.type === 'API'" label="绑定数据模型">
        <el-select class="task-form-item" v-model="taskForm.dataModelId" placeholder="请选择数据类型" @change="handleDataModelChange">
          <el-option v-for="item in dataModelList.filter(item => item.type === 'API')" :key="item.id" :label="item.name + '（' + item.id + '）'" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="taskForm.type === 'API' && taskForm.dataModelId" label="参数绑定">
        <el-descriptions title="为数据模型接口调用绑定参数" :column="1" border style="width: 600px;">
          <el-descriptions-item
            v-for="param in taskForm.dataModelParams"
            :label="param.keyPath"
            label-align="right"
            align="center"
            label-class-name="my-label"
            class-name="my-content"
            label-width="150px"
          >
            <el-select class="task-form-item" v-model="param.bindComponentId" placeholder="请选择你要绑定的组件" clearable>
              <el-option v-for="node in componentList" :key="node.id" :label="node.label + '（' + node.id + '）'" :value="node.id" />
            </el-select>
          </el-descriptions-item>
        </el-descriptions>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmitTask">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, watch, computed, inject } from 'vue';
import { ElMessage } from 'element-plus';
import { generateRandomString } from '../../utils/common';
import taskEnums from '../../utils/taskEnums';
import { useFlattenAndFilterComponentTree } from '../../hooks/components-tree-helper';

const emit = defineEmits(['onTasksChange']);

const componentsTree = inject('componentsTree');
const dataModelList = inject('dataModelList');
const tasksList = inject('tasksList');

const taskForm = reactive({
  name: '', // 任务名称
  type: '',  // 任务类型。暂时仅支持 API
  dataModelId: '', // 绑定数据模型名称
  dataModelParams: [], // 绑定数据模型请求参数
});

const dialogAddVisible = ref(false);
const dialogMode = ref('add');
const dialogTitle = computed(() => {
  dialogMode.value === 'add' ? '添加任务' : '编辑任务'
});

const componentList = useFlattenAndFilterComponentTree(componentsTree, (node) => { return true });

const validateField = (value, fieldName) => {
  if (!value.trim()) {
    ElMessage({ message: `${fieldName}不能为空`, type: 'warning' })
    return false
  }
  return true
};

const handleDataModelChange = () => {
  const dataModel = dataModelList.value.find(item => item.id === taskForm.dataModelId);
  if (!dataModel) return;
  taskForm.dataModelParams = [];
  // 将组件的 modelValue 与数据模型接口参数字段进行绑定
  ['query', 'body'].forEach((key) => {
    if (dataModel[key] && dataModel[key].length) {
      dataModel[key].forEach((item) => {
        taskForm.dataModelParams.push({
          keyPath: `${key}.${item.name}`, // 参数路径。如 query.name
          bindComponentId: '', // 绑定的组件 id
        });
      });
    }
  });
}

const handleAddTask = () => {
  dialogMode.value = 'add'
  dialogAddVisible.value = true
  // 清空
  taskForm.id = generateRandomString()
  taskForm.name = ''
  taskForm.type = ''
  taskForm.dataModelId = ''
  taskForm.dataModelParams = []
};

const handleEditTask = (row) => {
  dialogMode.value = 'edit'
  dialogAddVisible.value = true
  // 重置
  taskForm.id = row.id
  taskForm.name = row.name
  taskForm.type = row.type
  taskForm.dataModelId = row.dataModelId
  taskForm.dataModelParams = row.dataModelParams
};

const handleSubmitTask = () => {
  let { id, name, type, dataModelId, dataModelParams } = taskForm

  if (!validateField(name, '名称') || !validateField(type, '任务类型')) return
  if (type === 'API' && !validateField(dataModelId, '数据模型')) return
  if (dialogMode.value === 'add' && tasksList.value.some(item => item.name === name)) {
    ElMessage({ message: '任务名称已存在', type: 'warning' })
    return
  }

  if (dialogMode.value === 'add') {
    // 添加数据字段
    tasksList.value.push({ id, name, type, dataModelId, dataModelParams })
  } else {
    // 编辑数据字段
    tasksList.value = tasksList.value.map(item => {
      if (item.id === id) {
        item.name = name
        item.type = type
        item.dataModelId = dataModelId
        item.dataModelParams = dataModelParams
      }
      return item
    })
  }

  dialogAddVisible.value = false

  ElMessage({ message: dialogMode.value === 'add' ? '添加成功' : '编辑成功', type: 'success' })

  setTasksToStorage(tasksList.value)
  emit('onTasksChange', tasksList.value)
}

// 删除
const handleDeleteTask = (row) => {
  tasksList.value = tasksList.value.filter(item => item.id !== row.id)
  setTasksToStorage(tasksList.value)
  emit('onTasksChange', tasksList.value)
}

const setTasksToStorage = (data) => {
  localStorage.setItem('plex-tasks', JSON.stringify(data));
}
</script>

<style scoped lang="less">
.task-form-item {
  max-width: 600px;
}
</style>
