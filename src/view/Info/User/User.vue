<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue'
import Menu from "../../Admin/components/Menu.vue";
import Content from "../../Admin/components/Content.vue";
import {useStore} from "vuex";
import UserData from "./UserData.vue";
import UserAdd from './UserAdd.vue';

onMounted(() => {
  const store = useStore()
  store.commit('selectKey', 'user')
})
</script>
<template>

  <Content input_name="志愿者姓名">
    <UserAdd slot="add"/>

    <UserData/>
  </Content>

</template>
<style scoped>

</style>