<script setup lang="ts">
import {ref, reactive} from 'vue'
defineProps<{ input_name: string }>()
import {FlashOutline as FlashOutline} from '@vicons/ionicons5'
import CaseData from "./CaseData.vue";
</script>
<template>
<div class="content">
  <div class="body">
    <div class="top">
      <div class="search">
        <div class="input">
          <n-space vertical>
            <n-input-group>
              <n-input-group-label>{{ input_name }}</n-input-group-label>
              <n-input round placeholder="搜索" :style="{ width: '33%' }" :value="value" :autofocus="true">
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
        <div class="add-button">
          <n-button>添加</n-button>
        </div>
      </div>
    </div>
    <div class="data">
          <CaseData/>
    </div>
  </div>
</div>
</template>
<style scoped>
.content{
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #f5f7f9;
}
.body{
  position: relative;
  height: 95%;
  width: 90%;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 1%;
}
.top{
  position: relative;
  height: 10%;
  padding: 20px;

}
.data{
  position: relative;
  height: 71%;
  padding: 20px;

}
.search{
  width: 96%;
  position: relative;
  left:30px;
  background-color: #fff;
  border-radius: 1%;
  border-bottom: 1px solid rgba(0,0,0,0.2);
}
.input{
  margin-top: 15px;
  height: 60px;
  position: relative;
}
.input-button{
  position: absolute;
  left: 300px;
  top: 0px;
  margin-left: 18%;
  width: 10%;
}
.add-button{
  position: absolute;
  top: 0px;
  margin-left: 48%;
  width: 10%;
}
</style>