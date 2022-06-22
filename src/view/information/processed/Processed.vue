<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue'
import {useStore} from "vuex";
import Content from "../../Admin/components/Content.vue";
import ProcessedData from "./ProcessedData.vue";
import ProcessedAdd from "./ProcessedAdd.vue";
onMounted(()=>{
  const store = useStore()
  store.commit('selectKey','processed')
})
</script>
<template>
<Content input_name="关键字">
  <ProcessedAdd slot="add"/>
  <ProcessedData/></Content>
</template>
<style scoped>

</style>