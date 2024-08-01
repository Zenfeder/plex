export default {
  label: 'PlexUI自定义组件',
  code: 'PlexUICustom', // 每个组件库唯一值
  categoryList: [
    {
      label: "功能",
      category: 'display',
      children: [
        {
          label: "按钮",
          type: "plex-button",
        },
        {
          label: "输入框",
          type: "plex-input",
        }
      ]
    }
  ]
}