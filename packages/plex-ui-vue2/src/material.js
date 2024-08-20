export default {
  label: '本地测试组件开发',
  code: 'PlexUICustom', // 每个组件库唯一值
  categoryList: [
    {
      label: "页面",
      category: 'page',
      hidden: true,
      children: [
        {
          label: "页面",
          type: "plex-page",
        }
      ]
    },
    {
      label: "容器",
      category: 'container',
      children: [
        {
          label: "基础容器",
          type: "plex-container-base",
        },
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