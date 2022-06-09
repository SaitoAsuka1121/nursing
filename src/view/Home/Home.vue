<script setup lang="ts">
import {ref, reactive, onMounted, inject,getCurrentInstance } from 'vue'
import * as echarts from 'echarts'
import {useStore} from "vuex";
let echart = echarts

onMounted(()=>{
  init();
  const store = useStore()
  store.commit('selectKey','statistics')
})
function init(){

  const chart = echart.init(document.getElementById("chart")) ;
  const age = echart.init(document.getElementById("age")) ;

  age.setOption({
    title: {
      text: '用户年龄图',
      subtext: 'Age',
      left: 'center'
    },
    backgroundColor:'#fff',
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '年龄',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '60-65'},
          { value: 735, name: '66-70'},
          { value: 580, name: '71-75'},
          { value: 484, name: '76-80'},
          { value: 300, name: '81-90'},
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
  })
  chart.setOption({
    title: {
      text: '访问次数',
      left: 'center'
    },
    backgroundColor:'#fff',
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
      <div class="age-box">
        <div id="age" class="age">
        </div>
      </div>
    </div>
    <div class="chart-box">
      <div class="chart" id="chart">
      </div>
    </div>
  </div>

</template>
<style scoped>
.root{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f5f7f9;
}
.age-box{
  border:1px solid rgba(0,0,0,0.3);
  width: 400px;
  background-color: #fff;
  border-radius: 3%;
}

.age{
  width: 385px;
  height: 385px;
  margin: auto;
}
.chart-box{
  width: 1650px;
  height: 300px;
  margin: auto;
  border: 1px solid rgba(0,0,0,0.3);
  background-color: #fff;
  border-radius: 1%;
}
.chart{
  width: 1600px;
  height: 300px;
  margin: auto;
}
</style>