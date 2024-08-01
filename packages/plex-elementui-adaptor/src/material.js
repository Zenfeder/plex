export default {
  label: 'ElementUI组件',
  code: 'ElementUI', // 每个组件库唯一值
  categoryList: [
    {
      label: "功能",
      category: 'display',
      children: [
        {
          label: "按钮",
          type: "el-button",
        },
        {
          label: "输入框",
          type: "el-input",
        },
        {
          label: "选择器",
          type: "el-select",
        }
      ]
    },
    {
      label: "展示",
      category: 'display',
      children: [
        {
          label: "文字链接",
          type: "el-link",
        },
        {
          label: "标签",
          type: "el-tag",
        },
        {
          label: "进度条",
          type: "el-progress",
        },
        {
          label: "分割线",
          type: "el-divider",
        }
      ]
    }
  ]
}