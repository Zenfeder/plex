// 属性
const props = [
  {
    label: '类型',
    type: 'string',
    options: ['text', 'textarea', 'password', 'number', 'tel'],
    key: 'type',
    value: 'text' // 默认值
  },
  {
    label: '占位',
    type: 'string',
    key: 'placeholder',
    value: '请输入内容'
  },
  {
    label: '绑定字段',
    type: 'string',
    key: 'v-model',
    value: 'textValue',
    options: ['textValue', 'numberValue'], // 这里在渲染到页面上之后，需要根据接口获取的值进行赋值
    required: true
  },
];

export default props;