import { createApp } from 'vue'
import App from './App.vue'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import router from "./routes";
import axios from "./ts/request"
import * as echarts from 'echarts'
// @ts-ignore
import vueKinesis from 'vue-kinesis'
const vue= createApp(App)
vue.config.globalProperties.$axios=axios
vue.config.globalProperties.$echarts=echarts
vue.use(router)
vue.use(vueKinesis)
vue.mount('#app')
