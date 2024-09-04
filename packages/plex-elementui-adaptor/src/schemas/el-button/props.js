// 属性
const props = [
  {
    label: '尺寸',
    type: 'string',
    options: ['medium', 'small', 'mini'],
    key: 'size',
    value: 'medium' // 默认值
  },
  {
    label: '类型',
    type: 'string',
    options: ['primary', 'success', 'warning', 'danger', 'info', 'text'],
    key: 'type',
    value: 'primary' // 默认值
  },
  {
    label: '是否朴素按钮',
    type: 'boolean',
    key: 'plain',
    value: true
  },
  {
    label: '是否圆角按钮',
    type: 'boolean',
    key: 'round',
    value: true
  },
  {
    label: '是否圆形按钮',
    type: 'boolean',
    key: 'circle',
    value: false
  },
  {
    label: '是否禁用',
    type: 'boolean',
    key: 'disabled',
    value: false
  }
];

export default props;