// 样式
const style = [
  {
    label: '宽度',
    key: 'width',
    type: 'string',
    value: '1200px'
  },
  {
    label: '高度',
    key: 'height',
    type: 'string',
    value: '300px'
  },
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
    value: '#EFEFEF'
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
  }
];

export default style;