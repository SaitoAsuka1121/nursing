<script setup lang="ts">
import {ref, reactive, onMounted, inject,getCurrentInstance } from 'vue'
import * as echarts from 'echarts'
let echart = echarts
onMounted(()=>{
  init();
})
function init(){
  let chart = echart.init(document.getElementById("chart"))
  chart.setOption({
    xAxis: {
      type: "category",
      data: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ]
    },
    tooltip: {
      trigger: "axis"
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [
          820,
          932,
          901,
          934,
          1290,
          1330,
          1320,
          801,
          102,
          230,
          4321,
          4129
        ],
        type: "line",
        smooth: true
      }
    ]
  });
  window.onresize = function() {
    //自适应大小
    chart.resize();
  };
}
</script>
<template>
  <div class="root">
    <div class="content">

    </div>
    <div class="chart" id="chart">
    </div>

  </div>

</template>
<style scoped>
.root{
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
.chart{
  width: 1660px;
  height: 400px;
}
</style>