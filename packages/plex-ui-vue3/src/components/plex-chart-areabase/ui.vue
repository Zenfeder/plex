<template>
  <div class="plex-chart-areabase" :id="_id" :style="mergedStyle"></div>
</template>

<script setup>
import { defineProps, watch, reactive, onMounted } from 'vue';
import { generateRandomString } from '../../utils/common';

import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

defineOptions({
  name: 'plex-chart-areabase'
});

const props = defineProps({
  style: {
    type: Object,
    default: () => ({}),
  },
});

// 创建内部响应式对象
const mergedStyle = reactive({ ...props.style });

const _id = 'plex-chart-' + generateRandomString();
let chartDom = null;
let myChart = null;

// 监听 style 的变化
watch(
  () => props.style,
  (newStyle) => {
    Object.assign(mergedStyle, newStyle); // 合并新传入的样式
    myChart?.resize();
  },
  { deep: true, immediate: true }
);

onMounted(() => {
  chartDom = document.getElementById(_id);
  myChart = echarts.init(chartDom);
  
  // 定义数据
  let option = {
    // title: {
    //   text: '基础面积图'
    // },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {}
      }
    ]
  };

  option && myChart.setOption(option);
});


</script>

<style scoped lang="less">
.plex-chart-areabase {
  box-sizing: border-box;
}
</style>
  