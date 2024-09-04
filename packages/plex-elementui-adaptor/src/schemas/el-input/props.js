// 属性
const props = [
  {
    label: '绑定值',
    type: 'string',
    key: 'v-model',
    value: ''
  },
  {
    label: 'placeholder',
    type: 'string',
    key: 'value',
    value: '请输入内容'
  },
  {
    label: '类型',
    type: 'string',
    options: ['text', 'textarea'],
    key: 'type',
    value: 'text' // 默认值
  }
];

export default props;