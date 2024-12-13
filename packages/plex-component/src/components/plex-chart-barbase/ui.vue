<template>
  <div class="plex-chart-barbase" :id="_id" :style="mergedStyle"></div>
</template>

<script setup>
import { watch, reactive, onMounted, nextTick } from 'vue';
import { generateRandomString } from '../../utils/common';

import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([GridComponent, BarChart, CanvasRenderer]);

defineOptions({
  name: 'plex-chart-barbase'
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
    //   text: '基础柱状图'
    // },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  };

  option && myChart.setOption(option);
});


</script>

<style scoped lang="less">
.plex-chart-barbase {
  box-sizing: border-box;
}
</style>
  