<script setup lang="ts">
import {ref, reactive, watch} from 'vue'
import {useStore} from "vuex";
const store = useStore()
let town = ref(store.state.town)
watch(() => store.state.town, (newV, oldV) => {
  town.value = newV
})
</script>
<template>

</template>
<style scoped>

</style>