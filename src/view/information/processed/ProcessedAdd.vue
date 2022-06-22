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
  announcement: {
    name: '',
    user_name: '',
    content: ''
  }
})


const onNegativeClick = () => {
  message.success('取消添加')
  showModal.value = false
}

function onPositiveClick() {
  const data = {
    name: formValue.value.announcement.name,
    user_name: formValue.value.announcement.user_name,
    content: formValue.value.announcement.content
  }
  console.log(data)
  const messageReactive = message.loading('上传中', {
    duration: 0
  })
  form.value?.validate((errors) => {
    if (!errors) {

      message.info('正在添加')
      axios.post("/processed/add", data).then((res) => {
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
      title="添加消息信息"
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
      <n-form-item label="消息类型" path="announcement.name">
        <n-input v-model:value="formValue.announcement.name" placeholder="输入标题"/>
      </n-form-item>
      <n-form-item label="申请人" path="announcement.user_name">
        <n-input v-model:value="formValue.announcement.user_name" placeholder="输入发起者"/>
      </n-form-item>
      <n-form-item label="内容" path="announcement.content">
        <n-input v-model:value="formValue.announcement.content" placeholder="输入内容"/>
      </n-form-item>
    </n-form>
  </n-modal>
</template>
<style scoped>

.add-button {
  position: absolute;
  top: -97px;
  left: 800px;
}
</style>