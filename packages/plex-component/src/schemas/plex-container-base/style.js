// 样式
const style = [
  {
    label: '显示方式',
    key: 'display',
    type: 'string',
    options: ['inline-block', 'block'],
    defaultValue: 'inline-block'
  },
  {
    label: '宽度',
    key: 'width',
    type: 'string',
    defaultValue: '100%'
  },
  {
    label: '高度',
    key: 'height',
    type: 'string',
    defaultValue: 'auto'
  },
  {
    label: '最小高度',
    key: 'minHeight',
    type: 'string',
    defaultValue: '300px'
  },
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
    defaultValue: '#EFEFEF'
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
    type: 'number',
    defaultValue: 0
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
  },
  {
    label: '字体粗细',
    key: 'fontWeight',
    type: 'string',
    options: ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    defaultValue: 'normal'
  },
  {
    label: '字体样式',
    key: 'fontStyle',
    type: 'string',
    options: ['normal', 'italic', 'oblique'],
    defaultValue: 'normal'
  }
];

export default style;