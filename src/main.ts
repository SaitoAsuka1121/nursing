import { createApp } from 'vue'
import App from './App.vue'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import router from "./routes";
import axios from "axios"
import * as echarts from 'echarts'
// @ts-ignore
import vueKinesis from 'vue-kinesis'
import store from './store'
const vue= createApp(App)
axios.defaults.baseURL="http://localhost:8888"
vue.config.globalProperties.$axios=axios
vue.config.globalProperties.$echarts=echarts
vue.use(router)
vue.use(store)
vue.use(vueKinesis)
vue.mount('#app')
