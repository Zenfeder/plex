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
  },
  {
    label: '外边距-上',
    key: 'marginTop',
    type: 'string',
    defaultValue: ''
  },
  {
    label: '外边距-右',
    key: 'marginRight',
    type: 'string',
    defaultValue: ''
  },
  {
    label: '外边距-下',
    key: 'marginBottom',
    type: 'string',
    defaultValue: ''
  },
  {
    label: '外边距-左',
    key: 'marginLeft',
    type: 'string',
    defaultValue: ''
  }
];

export default style;