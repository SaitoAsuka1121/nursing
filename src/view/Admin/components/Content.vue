<script setup lang="ts">
import { ref, reactive } from "vue";
defineProps<{ input_name: string }>();
import { FlashOutline as FlashOutline } from "@vicons/ionicons5";
import {useStore} from 'vuex'
const del = () => {};
const showOuter = ref(false);
const showInner = ref(false);
function doShowOuter() {
  showOuter.value = true;
}
function doShowInner() {
  showInner.value = true;
}
const options = reactive([
  {
    label:'东岸村',
    value:'东岸村'
  },
  {
    label:'林岙村',
    value:'林岙村'
  },
  {
    label:'尹山头村',
    value:'尹山头村'
  },
  {
    label:'新垟村',
    value:'新垟村'
  },
  {
    label:'大垟下村',
    value:'大垟下村'
  },
  {
    label:'新西村',
    value:'新西村'
  },
  {
    label:'温溪新村',
    value:'温溪新村'
  },
  {
    label:'龙叶村',
    value:'龙叶村'
  },
  {
    label:'周岙底村',
    value:'周岙底村'
  },
  {
    label:'汛桥村',
    value:'汛桥村'
  },
  {
    label:'塘里岙村',
    value:'塘里岙村'
  },
  {
    label:'寺下村',
    value:'寺下村'
  },
  {
    label:'温溪村',
    value:'温溪村'
  },
  {
    label:'沙门村',
    value:'沙门村'
  },
  {
    label:'洲头村',
    value:'洲头村'
  },
  {
    label:'高岗村',
    value:'高岗村'
  },
  {
    label:'小峙村',
    value:'小峙村'
  },
  {
    label:'学神村',
    value:'学神村'
  },
  {
    label:'呈岙村',
    value:'呈岙村'
  },
  {
    label:'沙埠村',
    value:'沙埠村'
  },
  {
    label:'港头村',
    value:'港头村'
  }
]);
const store = useStore()
const town_value = ref(null)
function get_data(value:string){
  console.log(value);
  store.commit('town',value)
}
</script>
<template>
  <div class="content">
    <div class="body">
      <div class="top">
        <div class="search">
          <div class="input">
            <n-space vertical>
              
            </n-space>
          </div>
          <div class="add-button">
            <div class="add">
              <slot name="add"></slot>
            </div>
          </div>

<!--          <n-space vertical class="sel-button">-->
<!--            <n-select v-model:value="town_value" :options="options" @update:value='get_data'/>-->
<!--          </n-space>-->
        </div>
      </div>
      <div class="data">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style scoped>
.content {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #f5f7f9;
}
.body {
  position: relative;
  height: 95%;
  width: 90%;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 1%;
}
.top {
  position: relative;
  height: 10%;
  padding: 20px;
}
.data {
  position: relative;
  height: 71%;
  padding: 20px;
}
.search {
  width: 96%;
  position: relative;
  left: 30px;
  background-color: #fff;
  border-radius: 1%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.input {
  margin-top: 15px;
  height: 60px;
  position: relative;
}
.input-button {
  position: absolute;
  left: 300px;
  top: 0px;
  margin-left: 18%;
  width: 10%;
}
.add-button {
  position: absolute;
  top: -100px;
  margin-left: 48%;
  width: 10%;
}
.del-button {
  position: absolute;
  top: 0px;
  margin-left: 58%;
  width: 10%;
}
.sel-button {
  position: absolute;
  top: 0px;
  margin-left: 68%;
  width: 10%;
}
</style>