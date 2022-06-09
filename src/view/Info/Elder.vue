<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue'
import Menu from "../Admin/components/Menu.vue";
import Content from "./User/Content.vue";
import {useStore} from "vuex";
onMounted(()=>{
  const store = useStore()
  store.commit('selectKey','elder')
})
</script>
<template>
<Content input_name="老人姓名"/>
</template>
<style scoped>
</style>
