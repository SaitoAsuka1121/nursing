<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue'
import {useStore} from "vuex";
onMounted(()=>{
  const store = useStore()
  store.commit('selectKey','drug')
})
</script>
<template>

</template>
<style scoped>

</style>