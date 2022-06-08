<script setup lang="ts">
import {ref, reactive} from 'vue'
import LoginPanel from './components/LoginPanel.vue'
import RegisterPanel from './components/RegisterPanel.vue'

const behaviorType = ref(true);
const changeEmit = (val: boolean) => {
  behaviorType.value = val
}
</script>
<template>
  <div class="image">
  </div>
  <n-collapse-transition class="login" :show="behaviorType">
    <login-panel title="养老院登录" @changeEmit="changeEmit"/>
  </n-collapse-transition>
  <n-collapse-transition class="register" :show="!behaviorType">
    <register-panel title="注册申请" @changeEmit="changeEmit"/>
  </n-collapse-transition>
</template>
<style scoped>
.image {
  position: absolute;
  background-size: cover;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-color: #f7f7f7;
  z-index: -1;
  background-image: url('./images/login.7b57ab51.svg');
}
</style>