<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue'
import {useStore} from "vuex";
import Content from "../../Admin/components/Content.vue";
import AnnouncementData from "./AnnouncementData.vue";
import AnnouncementAdd from "./AnnouncementAdd.vue";
onMounted(()=>{
  const store = useStore()
  store.commit('selectKey','announcement')
})
</script>
<template>
<Content input_name="关键字">
  <AnnouncementAdd slot="add"/>
  <AnnouncementData/>
</Content>
</template>
<style scoped>

</style>