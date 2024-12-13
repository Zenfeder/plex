<template>
  <div class="plex-chart-barnegative" :id="_id" :style="mergedStyle"></div>
</template>

<script setup>
import { watch, reactive, onMounted, nextTick } from 'vue';
import { generateRandomString } from '../../utils/common';

import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer
]);

defineOptions({
  name: 'plex-chart-barnegative'
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

onMounted(async () => {
  await nextTick();
  chartDom = document.getElementById(_id);
  myChart = echarts.init(chartDom);
  
  let option = {
    // title: {
    //   text: '正负条形图'
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['Profit', 'Expenses', 'Income']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'value'
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    series: [
      {
        name: 'Profit',
        type: 'bar',
        label: {
          show: true,
          position: 'inside'
        },
        emphasis: {
          focus: 'series'
        },
        data: [200, 170, 240, 244, 200, 220, 210]
      },
      {
        name: 'Income',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [320, 302, 341, 374, 390, 450, 420]
      },
      {
        name: 'Expenses',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'left'
        },
        emphasis: {
          focus: 'series'
        },
        data: [-120, -132, -101, -134, -190, -230, -210]
      }
    ]
  };

  option && myChart.setOption(option);
});


</script>

<style scoped lang="less">
.plex-chart-barnegative {
  box-sizing: border-box;
}
</style>
  