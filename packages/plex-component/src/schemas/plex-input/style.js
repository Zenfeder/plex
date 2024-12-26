// 样式
const style = [
  {
    label: '文字颜色',
    key: 'color',
    type: 'color',
    value: ''
  },
  {
    label: '背景颜色',
    key: 'backgroundColor',
    type: 'color',
    value: ''
  },
  {
    label: '边框颜色',
    key: 'borderColor',
    type: 'color',
    value: ''
  },
  {
    label: '边框宽度',
    key: 'borderWidth',
    type: 'number',
    value: 0
  },
  {
    label: '边框圆角',
    key: 'borderRadius',
    type: 'number',
    value: 0
  },
  {
    label: '边框类型',
    key: 'borderStyle',
    type: 'string',
    options: ['solid', 'dashed', 'dotted'],
    value: 'solid'
  },
  {
    label: '字体大小',
    key: 'fontSize',
    type: 'number',
    value: 14
  }
];

export default style;