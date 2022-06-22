<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue'
import Menu from "../../Admin/components/Menu.vue";

import {useStore} from "vuex";
import Content from "../../Admin/components/Content.vue";
import ElderData from "./ElderData.vue";
import ElderAdd from "./ElderAdd.vue";
onMounted(()=>{
  const store = useStore()
  store.commit('selectKey','elder')
})
</script>
<template>
<Content input_name="姓名" >
  <ElderAdd slot="add"/>

  <ElderData/>
</Content>
</template>
<style scoped>
</style>
