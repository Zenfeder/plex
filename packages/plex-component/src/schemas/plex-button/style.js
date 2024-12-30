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
    label: '字体大小',
    key: 'fontSize',
    type: 'number',
    value: 14
  },
  {
    label: '字体粗细',
    key: 'fontWeight',
    type: 'string',
    options: ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    value: 'normal'
  },
  {
    label: '字体样式',
    key: 'fontStyle',
    type: 'string',
    options: ['normal', 'italic', 'oblique'],
    value: 'normal'
  },
  {
    label: '外边距-上',
    key: 'marginTop',
    type: 'string',
    value: ''
  },
  {
    label: '外边距-右',
    key: 'marginRight',
    type: 'string',
    value: ''
  },
  {
    label: '外边距-下',
    key: 'marginBottom',
    type: 'string',
    value: ''
  },
  {
    label: '外边距-左',
    key: 'marginLeft',
    type: 'string',
    value: ''
  }
];

export default style;