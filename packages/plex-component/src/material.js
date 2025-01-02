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
          label: "页面容器",
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
        },
        {
          label: "输入框",
          type: "plex-input",
        },
        {
          label: "下拉选择框",
          type: "plex-select",
        }
      ]
    },
    {
      label: "图表",
      category: 'chart',
      children: [
        {
          label: "基础折线图",
          type: "plex-chart-linebase",
        },
        {
          label: "基础面积图",
          type: "plex-chart-areabase",
        },
        {
          label: "堆叠折线图",
          type: "plex-chart-linestack",
        },
        {
          label: "堆叠面积图",
          type: "plex-chart-areastack",
        },
        {
          label: "基础柱状图",
          type: "plex-chart-barbase",
        },
        {
          label: "堆叠柱状图",
          type: "plex-chart-barstack",
        },
        {
          label: "正负条形图",
          type: "plex-chart-barnegative",
        },
        {
          label: "折柱混合图",
          type: "plex-chart-mixlinebar",
        },
        {
          label: "基础饼图",
          type: "plex-chart-piebase",
        },
        {
          label: "圆角环形图",
          type: "plex-chart-pieround",
        },
        {
          label: "K线图",
          type: "plex-chart-candlestick",
        },
        {
          label: "上证指数",
          type: "plex-chart-candlestick-sh",
        }
      ]
    }
  ]
}