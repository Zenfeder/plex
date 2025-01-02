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
    label: '标签',
    type: 'string',
    key: 'label',
    value: '字段标签'
  },
  {
    label: '占位',
    type: 'string',
    key: 'placeholder',
    value: '请输入内容'
  },
  {
    label: '数据源绑定',
    type: 'string',
    key: 'modelValue',
    value: '',
    bindDataModel: '' // 标识需要绑定数据模型
  }
];

export default props;