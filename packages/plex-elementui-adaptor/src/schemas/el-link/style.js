// 样式
const style = [
  {
    label: '字体大小',
    key: 'fontSize',
    type: 'string',
    value: '14px'
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
    type: 'number',
    value: NaN
  },
  {
    label: '外边距-右',
    key: 'marginRight',
    type: 'number',
    value: NaN
  },
  {
    label: '外边距-下',
    key: 'marginBottom',
    type: 'number',
    value: NaN
  },
  {
    label: '外边距-左',
    key: 'marginLeft',
    type: 'number',
    value: NaN
  }
];

export default style;