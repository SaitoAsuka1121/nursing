<script setup lang="ts">
import {ref, reactive} from 'vue'
import {FormInst, FormItemRule, useMessage} from 'naive-ui'
import axios from "axios";

const message = useMessage()
const showModal = ref(false)
const showAdd = () => {
  showModal.value = true
}
const form = ref<FormInst | null>()
const formValue = ref({
  drug: {
    name: '',
    begin: '',
    end: '',
    price: null,
  }
})
const onNegativeClick = () => {
  message.success('取消添加')
  showModal.value = false
}
function onPositiveClick  () {
  const data = {
    name: formValue.value.drug.name,
    begin: formValue.value.drug.begin,
    end:  formValue.value.drug.end,
    price:  formValue.value.drug.price

  }
  const messageReactive = message.loading('上传中', {
    duration: 0
  })
  form.value?.validate((errors) => {
    if (!errors) {
      message.info('正在添加')
      axios.post("/drug/add", data).then((res) => {
        console.log(res)
        message.success('添加成功')
      }).catch((err) => {
        console.log(err)
      })
    } else {
      message.error('请检查表单是否符合要求!')
    }
    messageReactive.destroy()
  })
  showModal.value = false
}
</script>
<template>
  <div class="add-button">
    <n-button @click="showAdd" type="info">添加</n-button>
  </div>
  <n-modal
      v-model:show="showModal"
      :mask-closable="false"
      preset="dialog"
      title="添加老人信息"
      positive-text="确认"
      negative-text="取消"
      @positive-click="onPositiveClick"
      @negative-click="onNegativeClick"
  >
    <n-form
        ref="form"
        :label-width="80"
        :model="formValue"
    >
      <n-form-item label="药名" path="drug.name">
        <n-input v-model:value="formValue.drug.name" placeholder="输入药名"/>
      </n-form-item>
      <n-form-item label="生产日期" path="drug.begin">
        <n-input v-model:value="formValue.drug.begin" placeholder="输入生产日期"/>
      </n-form-item>
      <n-form-item label="过期日期" path="drug.end">
        <n-input v-model:value="formValue.drug.end" placeholder="输入过期日期"/>
      </n-form-item>
      <n-form-item label="价格" path="drug.price">
        <n-input v-model:value="formValue.drug.price" placeholder="输入价格"/>
      </n-form-item>
    </n-form>
  </n-modal>
</template>
<style scoped>

.add-button {
  position: absolute;
  top: -97px;
  left: 800px;
  z-index: 1001;
}
</style>