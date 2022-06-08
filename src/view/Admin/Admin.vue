<script setup lang="ts">
import {ref, reactive} from 'vue'
import Menu from './components/Menu.vue'
import Top from "./components/Top.vue";
import Home from "../Home/Home.vue"
</script>
<template>
  <div class="nav">
    <Menu><Home/></Menu>
  </div>
</template>
<style scoped>


</style>