<script setup lang="ts">
import {ref, reactive} from 'vue'
import {inject} from "vue";
import {Icon} from '@vicons/utils'
import {
  ArrowBackCircleOutline as ArrowBackIcon,
  ArrowForwardCircleOutline as ArrowOutIcon,
  Repeat as RepeatIcon,
  ExitOutline as ExitIcon
} from '@vicons/ionicons5'
import router from "../../../routes";
const emit = defineEmits(["sendBack"])
const back = ref(true)
const send_messages = ()=>{
  emit('sendBack',back.value)
  back.value = !back.value
}

const repeat = ()=>{
  router.go(0)
}
const username = ref('刘旭锋')
</script>
<template>
  <div class="root">
    <div class="back-button">
      <div v-show="back" class="button">
        <n-button text style="font-size: 24px" @click="send_messages">
          <n-icon >
            <arrowBack-icon/>
          </n-icon>
        </n-button>
      </div>
      <div v-show="!back" class="button">
        <n-button text style="font-size: 24px" @click="send_messages">
          <n-icon>
            <arrowOut-icon/>
          </n-icon>
        </n-button>
      </div>
    </div>
  <div class = "repeat-button">
      <n-button text style="font-size: 24px" @click="repeat">
        <n-icon>
          <repeat-icon/>
        </n-icon>
      </n-button>
  </div>
    <div class="user">
      <n-icon>
      </n-icon>
      <span>{{username}}</span>
      <n-button text style="font-size: 24px">
        <n-icon>
          <exit-icon/>
        </n-icon>
      </n-button>
    </div>
  </div>
</template>
<style scoped>
.root {
  height: 100%;
  width: 100%;
}
.back-button{
  float: left;
  width: 18px;
  height: 18px;
  margin-left: 30px;
  margin-top: 20px;
}
.repeat-button{
  float: left;
  width: 18px;
  height: 18px;
  margin-left: 30px;
  margin-top: 20px;
}
.user{
  float: right;
  margin-right: 30px;
  margin-top: 20px;
}

</style>