// 属性
const props = [
  {
    label: '原生 href 属性',
    type: 'string',
    key: 'href',
    value: ''
  },
  {
    label: '类型',
    type: 'string',
    options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
    key: 'type',
    value: 'default' // 默认值
  },
  {
    label: '是否下划线',
    type: 'boolean',
    key: 'underline',
    value: true
  },
  {
    label: '是否禁用状态',
    type: 'boolean',
    key: 'disabled',
    value: false
  }
];

export default props;