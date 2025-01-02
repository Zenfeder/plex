// 样式
const style = [
  {
    label: '文字颜色',
    key: 'color',
    type: 'color',
    defaultValue: ''
  },
  {
    label: '背景颜色',
    key: 'backgroundColor',
    type: 'color',
    defaultValue: ''
  },
  {
    label: '边框颜色',
    key: 'borderColor',
    type: 'color',
    defaultValue: ''
  },
  {
    label: '边框宽度',
    key: 'borderWidth',
    type: 'string',
    defaultValue: '0px'
  },
  {
    label: '边框圆角',
    key: 'borderRadius',
    type: 'string',
    defaultValue: '0px'
  },
  {
    label: '边框类型',
    key: 'borderStyle',
    type: 'string',
    options: ['solid', 'dashed', 'dotted'],
    defaultValue: 'solid'
  },
  {
    label: '字体大小',
    key: 'fontSize',
    type: 'string',
    defaultValue: '14px'
  }
];

export default style;