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
    value: NaN
  },
  {
    label: '边框圆角',
    key: 'borderRadius',
    type: 'number',
    value: NaN
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
    label: '内边距-上',
    key: 'paddingTop',
    type: 'number',
    value: NaN
  },
  {
    label: '内边距-右',
    key: 'paddingRight',
    type: 'number',
    value: NaN
  },
  {
    label: '内边距-下',
    key: 'paddingBottom',
    type: 'number',
    value: NaN
  },
  {
    label: '内边距-左',
    key: 'paddingLeft',
    type: 'number',
    value: NaN
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