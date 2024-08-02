export default {
  label: '本地测试组件开发',
  code: 'PlexUICustom', // 每个组件库唯一值
  categoryList: [
    {
      label: "容器",
      category: 'container',
      children: [
        {
          label: "布局容器",
          type: "plex-container-layout",
        }
      ]
    },
    {
      label: "功能",
      category: 'display',
      children: [
        {
          label: "按钮",
          type: "plex-button",
        }
      ]
    }
  ]
}