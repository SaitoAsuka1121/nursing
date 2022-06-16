<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue'
import {useStore} from "vuex";
import Content from "../../Admin/components/Content.vue";
import AccidentData from "./AccidentData.vue";
onMounted(()=>{
  const store = useStore()
  store.commit('selectKey','accident')
})
</script>
<template>
<Content><AccidentData/></Content>
</template>
<style scoped>

</style>