<template>
  <div class="data-model-config">
    <el-table :data="model" style="width: 100%">
      <el-table-column prop="name" label="字段名称">
        <template #default="scope">
          <el-input v-model="scope.row.name" placeholder="字段名称"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="字段类型">
        <template #default="scope">
          <el-select
            v-model="scope.row.type"
            placeholder="字段类型"
            @change="handleTypeChange(scope.row)"
          >
            <el-option label="字符串" value="string"></el-option>
            <el-option label="数字" value="number"></el-option>
            <el-option label="布尔值" value="boolean"></el-option>
            <el-option label="对象" value="object"></el-option>
            <el-option label="数组" value="array"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="required" label="是否必填">
        <template #default="scope">
          <el-switch v-model="scope.row.required"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="defaultValue" label="默认值">
        <template #default="scope">
          <el-input
            v-model="scope.row.defaultValue"
            :disabled="disableDefaultValue(scope.row.type)"
            placeholder="默认值"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="danger" size="small" @click="removeField(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="success" size="small" @click="addField">添加字段</el-button>

    <!-- 嵌套字段 -->
    <div v-for="(field, index) in model" :key="index">
      <div v-if="isNestedField(field)">
        <el-divider>嵌套字段: {{ field.name || "未命名字段" }}</el-divider>
        <DataModelConfig :model="field.children" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "DataModelConfig"
})

const props = defineProps({
  model: {
    type: Array,
    required: true,
    default: () => [],
  }
})

// 添加新字段
const addField = () => {
  props.model.push({
    name: "",
    type: "string",
    required: false,
    defaultValue: "",
    children: null, // 初始化为空对象或数组时为 null
  });
};

// 删除字段
const removeField = (index) => {
  props.model.splice(index, 1);
};

// 根据字段类型判断是否需要初始化 children
const handleTypeChange = (field) => {
  if (field.type === "object" || field.type === "array") {
    if (!field.children) {
      field.children = []; // 初始化 children 数组
    }
  } else {
    field.children = null; // 清空 children
  }
};

// 禁用默认值输入框（对象和数组类型不能有默认值）
const disableDefaultValue = (type) => {
  return type === "object" || type === "array";
};

// 判断是否为对象或数组字段，用于显示嵌套字段
const isNestedField = (field) => {
  return field && (field.type === "object" || field.type === "array");
};
</script>

<style scoped>
.data-model-config {
  padding-left: 20px;
}
</style>
