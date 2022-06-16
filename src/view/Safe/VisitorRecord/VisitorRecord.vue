<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue'
import {useStore} from "vuex";
import Content from "../../Admin/components/Content.vue";
import VisitorRecordData from "./VisitorRecordData.vue";
onMounted(()=>{
  const store = useStore()
  store.commit('selectKey','visitorRecord')
})
</script>
<template>
<Content><VisitorRecordData/></Content>
</template>
<style scoped>

</style>