<template>
  <div class="plex-chart-candlestick" :id="_id" :style="mergedStyle"></div>
</template>

<script setup>
import { watch, reactive, onMounted, nextTick } from 'vue';
import { generateRandomString } from '../../utils/common';

import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { CandlestickChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, CandlestickChart, CanvasRenderer]);

defineOptions({
  name: 'plex-chart-candlestick'
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
  
  // 定义数据
  let option = {
    xAxis: {
      data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27']
    },
    yAxis: {},
    series: [
      {
        type: 'candlestick',
        data: [
          [20, 34, 10, 38],
          [40, 35, 30, 50],
          [31, 38, 33, 44],
          [38, 15, 5, 42]
        ]
      }
    ]
  };

  option && myChart.setOption(option);
});


</script>

<style scoped lang="less">
.plex-chart-candlestick {
  box-sizing: border-box;
}
</style>
  