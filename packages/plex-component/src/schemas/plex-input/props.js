// 属性
const props = [
  {
    label: '类型',
    type: 'string',
    options: ['text', 'textarea', 'password', 'number', 'tel'],
    key: 'type',
    defaultValue: 'text' // 默认值
  },
  {
    label: '标签',
    type: 'string',
    key: 'label',
    defaultValue: '字段标签'
  },
  {
    label: '占位',
    type: 'string',
    key: 'placeholder',
    defaultValue: '请输入内容'
  },
  {
    label: '数据源绑定',
    type: 'string',
    key: 'modelValue',
    defaultValue: '',
    bindDataModel: '' // 标识需要绑定数据模型
  }
];

export default props;