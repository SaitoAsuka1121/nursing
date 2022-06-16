<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue'
import Menu from "../../Admin/components/Menu.vue";

import {useStore} from "vuex";
import Content from "../../Admin/components/Content.vue";
import ElderData from "./ElderData.vue";
import ElderAdd from "./ElderAdd.vue";
import ElderDel from './ElderDel.vue';
onMounted(()=>{
  const store = useStore()
  store.commit('selectKey','elder')
})
</script>
<template>
<Content input_name="老人姓名" >
  <ElderAdd slot="add"/>
  <ElderDel slot="del"/>
  <ElderData/>
</Content>
</template>
<style scoped>
</style>
