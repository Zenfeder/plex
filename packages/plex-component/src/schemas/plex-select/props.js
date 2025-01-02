// 属性
const props = [
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
    value: '请选择'
  },
  {
    label: '下拉项数据源',
    type: 'array',
    key: 'options',
    value: [],
    bindDataModel: '' // 标识需要绑定数据模型
  },
  {
    label: '下拉项名称',
    type: 'string',
    key: 'optionName',
    value: 'label'
  },
  {
    label: '下拉项值',
    type: 'string',
    key: 'optionValue',
    value: 'value'
  },
  {
    label: 'select值绑定',
    type: 'string',
    key: 'modelValue',
    value: '',
    bindDataModel: '' // 标识需要绑定数据模型
  }
];

export default props;