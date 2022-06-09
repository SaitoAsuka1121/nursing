<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import {provide } from 'vue'
import {NMessageProvider} from "naive-ui";
import Login from './view/Login/Login.vue'
import Menu from "./view/Admin/components/Menu.vue";

</script>

<template>
  <n-message-provider>
      <Menu><router-view /></Menu>
  </n-message-provider>
</template>

<style>
#app {
  position: absolute;
  left: 0;
  top: 0;

  font-family: "Microsoft YaHei UI",Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  /*background-color: #000;*/
}
</style>
