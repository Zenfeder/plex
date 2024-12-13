<template>
  <div class="plex-chart-piebase" :id="_id" :style="mergedStyle"></div>
</template>

<script setup>
import { watch, reactive, onMounted, nextTick } from 'vue';
import { generateRandomString } from '../../utils/common';

import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

defineOptions({
  name: 'plex-chart-piebase'
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
    title: {
      text: '网站访问统计',
      subtext: 'mock 数据',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  option && myChart.setOption(option);
});


</script>

<style scoped lang="less">
.plex-chart-piebase {
  box-sizing: border-box;
}
</style>
  