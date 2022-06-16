<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue'
import {useStore} from "vuex";
import Content from "../../Admin/components/Content.vue";
import DrugData from "./DrugData.vue";

onMounted(()=>{
  const store = useStore()
  store.commit('selectKey','drug')
})
</script>
<template>
<Content input_name="药品名"><DrugData/></Content>
</template>
<style scoped>

</style>