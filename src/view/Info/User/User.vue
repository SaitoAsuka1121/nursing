<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue'
import Menu from "../../Admin/components/Menu.vue";
import Content from "../../Admin/components/Content.vue";
import {useStore} from "vuex";
import UserData from "./UserData.vue";
onMounted(()=>{
  const store = useStore()
  store.commit('selectKey','user')
})
</script>
<template>

  <Content input_name="用户姓名"><UserData/></Content>

</template>
<style scoped>

</style>