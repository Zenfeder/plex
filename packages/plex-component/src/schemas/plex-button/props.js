// 属性
const props = [
  {
    label: '按钮文本',
    type: 'string',
    key: 'slot',
    defaultValue: '按钮' // 默认值
  },
  {
    label: '类型',
    type: 'string',
    options: ['default', 'primary', 'success', 'warning', 'danger'],
    key: 'type',
    defaultValue: 'primary' // 默认值
  },
  {
    label: '是否朴素按钮',
    type: 'boolean',
    key: 'plain',
    defaultValue: false
  },
  {
    label: '是否圆角按钮',
    type: 'boolean',
    key: 'round',
    defaultValue: false
  },
  {
    label: '是否圆形按钮',
    type: 'boolean',
    key: 'circle',
    defaultValue: false
  },
  {
    label: '是否加载中',
    type: 'boolean',
    key: 'loading',
    defaultValue: false
  },
  {
    label: '是否禁用',
    type: 'boolean',
    key: 'disabled',
    defaultValue: false
  }
];

export default props;