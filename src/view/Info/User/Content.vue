<script setup lang="ts">
import {ref, reactive} from 'vue'
import { FlashOutline } from '@vicons/ionicons5'
import MyNDataTable from "./MyNDataTable.vue";
</script>
<template>
<div class="content">
  <div class="body">
  <div class="search">
    <div class="input">
      <n-space vertical>
        <n-input-group>
          <n-input-group-label>用户姓名</n-input-group-label>
          <n-input round placeholder="搜索" :style="{ width: '33%' }">
            <template #prefix>
              <n-icon :component="FlashOutline" />
            </template>
          </n-input>
        </n-input-group>
      </n-space>
    </div>
    <div class="input-button">
      <n-button>搜索</n-button>
    </div>

  </div>
    <div class="data">
      <MyNDataTable/>
    </div>
  </div>
</div>
</template>
<style scoped>
.content{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f5f7f9;
}
.search{
  width: 96%;
  position: relative;
  left:30px;
  top: 15px;
  background-color: #fff;
  border-radius: 1%;
  border-bottom: 1px solid rgba(0,0,0,0.2);
}
.body{
  width: 95%;
  height: 100%;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  border-radius: 1%;
  border: 1px solid rgba(0,0,0,0.2);
}
.input{
  position: relative;
  top: 15px;
}
.input-button{
  position: relative;
  top: -15px;
}
.data{
  position: relative;
  margin-top: 30px;
}
</style>