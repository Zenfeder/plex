<template>
  <div class="plex-chart-mixlinebar" :id="_id" :style="mergedStyle"></div>
</template>

<script setup>
import { defineProps, watch, reactive, onMounted } from 'vue';
import { generateRandomString } from '../../utils/common';

import * as echarts from 'echarts/core';
import {
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { BarChart, LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

defineOptions({
  name: 'plex-chart-mixlinebar'
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
    //   text: '折柱混合图'
    // },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    legend: {
      data: ['Evaporation', 'Precipitation', 'Temperature']
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Precipitation',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          formatter: '{value} ml'
        }
      },
      {
        type: 'value',
        name: 'Temperature',
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          formatter: '{value} °C'
        }
      }
    ],
    series: [
      {
        name: 'Evaporation',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' ml';
          }
        },
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
        ]
      },
      {
        name: 'Precipitation',
        type: 'bar',
        tooltip: {
          valueFormatter: function (value) {
            return value + ' ml';
          }
        },
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
        ]
      },
      {
        name: 'Temperature',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' °C';
          }
        },
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
      }
    ]
  };

  option && myChart.setOption(option);
});


</script>

<style scoped lang="less">
.plex-chart-mixlinebar {
  box-sizing: border-box;
}
</style>
  