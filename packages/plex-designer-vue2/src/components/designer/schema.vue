<!-- 右侧组件配置栏 -->
<template>
  <div class="designer-schema">
    <Tabs class="tabs-wrapper" v-model="activeTab">
      <TabPane
        v-for="tab in tabCategories"
        :label="tab.label"
        :name="tab.value"
        :key="tab.value">
        <!-- 组件配置 -->
        <template v-if="activeTab === 'props'">
          <div class="props-item" v-for="item in props" :key="item.key">
            <div class="label">{{ item.label }}:</div>
            <template v-if="item.type === 'string'">
              <template v-if="item.options && item.options.length">
                <Select class="form-item" v-model="item.value">
                  <Option v-for="option in item.options" :value="option" :key="option">{{ option }}</Option>
                </Select>
              </template>
              <template v-else>
                <Input class="form-item" v-model="item.value" />
              </template>
            </template>
            <template v-else-if="item.type === 'number'">
              <Input class="form-item" v-model="item.value" type="number"/></template>
            <template v-else-if="item.type === 'boolean'">
              <i-switch v-model="item.value" />
            </template>
          </div>
        </template>
        <!-- 样式配置 -->
        <template v-if="activeTab === 'style'">
          <div class="props-item" v-for="item in style" :key="item.key">
            <div class="label">{{ item.label }}:</div>
            <template v-if="item.type === 'string'">
              <template v-if="item.options && item.options.length">
                <Select class="form-item" v-model="item.value">
                  <Option v-for="option in item.options" :value="option" :key="option">{{ option }}</Option>
                </Select>
              </template>
              <template v-else>
                <Input class="form-item" v-model="item.value"/>
              </template>
            </template>
            <template v-else-if="item.type === 'number'">
              <Input class="form-item" v-model="item.value" type="number"/></template>
            <template v-else-if="item.type === 'boolean'">
              <i-switch v-model="item.value" />
            </template>
            <template v-else-if="item.type === 'color'">
              <ColorPicker v-model="item.value" />
            </template>
          </div>
        </template>
        <!-- 事件配置 -->
        <template v-if="activeTab === 'events'">事件配置</template>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  name: 'PdSchema',
  props: {
    activeComponentNode: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      tabCategories: [{
        label: '属性',
        value: 'props',
      }, {
        label: '样式',
        value: 'style',
      }, {
        label: '事件',
        value: 'events'
      }],
      activeTab: 'props',
      props: [],
      style: [],
      events: [],
    };
  },
  methods: {
    parseSchemeProps (props) {
      
    },
    parseSchemeStyle (style) {
      
    },
    parseSchemeEvents (events) {
      
    }
  },
  watch: {
    'activeComponentNode.id': {
      handler (val) {
        console.log('>>> activeComponentNode.id changed: ', val)
        console.log('>>> activeComponentNode: ', this.activeComponentNode)
        const { props, style, events } = this.activeComponentNode.schema
        this.props = [...props]
        this.style = [...style]
        this.events = [...events]
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
@input-width: 180px;

.designer-schema {
  box-sizing: border-box;
  padding: 10px 0;
  border-left: 1px solid #f5f5f5;
  box-shadow: -2px 0 20px 0 rgba(0, 0, 0, .1);
  background: #fff;

  .tabs-wrapper {
    width: 100%;
    height: 100%;
  }
  .form-item {
    width: @input-width;
  }
  .props-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 10px;
    .label {
      display: block;
      width: 120px;
      padding-right: 10px;
      text-align: right;
    }
  }
}
</style>