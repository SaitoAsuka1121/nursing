<script setup lang="ts" >
import {ref, reactive, onMounted} from 'vue'
import Menu from "../../Admin/components/Menu.vue";

import {useStore} from "vuex";
import CaseData from "./CaseData.vue";
import Content from "../../Admin/components/Content.vue";
import CaseAdd from "./CaseAdd.vue";
const emit = defineEmits(["changeEmit"])

onMounted(()=>{
  const store = useStore()
  store.commit('selectKey','caseHistory')
})
</script>
<template>
<Content input_name="老人姓名"><CaseAdd slot="add"/><CaseData/></Content>
</template>
<style scoped>

</style>