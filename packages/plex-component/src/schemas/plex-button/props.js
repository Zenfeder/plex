// 属性
const props = [
  {
    label: '按钮文本',
    type: 'string',
    key: 'slot',
    value: '按钮' // 默认值
  },
  {
    label: '类型',
    type: 'string',
    options: ['default', 'primary', 'success', 'warning', 'danger'],
    key: 'type',
    value: 'primary' // 默认值
  },
  {
    label: '是否朴素按钮',
    type: 'boolean',
    key: 'plain',
    value: false
  },
  {
    label: '是否圆角按钮',
    type: 'boolean',
    key: 'round',
    value: false
  },
  {
    label: '是否圆形按钮',
    type: 'boolean',
    key: 'circle',
    value: false
  },
  {
    label: '是否加载中',
    type: 'boolean',
    key: 'loading',
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