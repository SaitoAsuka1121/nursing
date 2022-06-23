<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue'
import {FormInst, FormItemRule, useMessage} from 'naive-ui'
import axios from "axios";

const message = useMessage()
const showModal = ref(false)
const showAdd = () => {
  showModal.value = true
}
const form = ref<FormInst | null>()
const formValue = ref({
  user: {
    name: '',
    phone: '',
    sex: '',
    cases:'',
    relative_phone:''
  }
})
const rules = {
  user: {
    name: {
      required: true,
      trigger: 'blur',
      validator: (rule: FormItemRule, value: string) => {
        return new Promise<void>((resolve, reject) => {
          if (value.length <= 1 || value.length >= 15) {
            reject(Error('非正确名字')) // reject with error message
          } else {
            resolve()
          }
        })
      }
    },
    phone: {
      required: true,
      trigger: 'input',
      validator: (rule: FormItemRule, value: string) => {
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            if (!/^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(value)) {
              reject(Error('账户格式错误,请检查!'))
            } else {
              resolve()
            }
          })
        })
      }
    },
    sex:{
      required: true,
      trigger: 'input',
      validator: (rule: FormItemRule, value: string) => {
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            if (value!='男' && value !='女') {
              reject(Error('账户格式错误,请检查!'))
            } else {
              resolve()
            }
          })
        })
      }
    },
    relative_phone:{
      required: true,
      trigger: 'input',
      validator: (rule: FormItemRule, value: string) => {
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            if (value==formValue.value.user.phone) {
              reject(Error('紧急联系不能为自己!'))
            } else {
              resolve()
            }
          })
        })
      }
    }
  },
}
const onNegativeClick = () => {
  message.success('取消添加')
  showModal.value = false
}
function onPositiveClick  () {
  const data = {
    name: formValue.value.user.name,
    phone: formValue.value.user.phone,
    sex: formValue.value.user.sex,
    cases:formValue.value.user.cases,
    re_phone:formValue.value.user.relative_phone

  }
  console.log(data)
  const messageReactive = message.loading('上传中', {
    duration: 0
  })
  form.value?.validate((errors) => {
    if (!errors) {
      message.info('正在添加')
      axios.post("/case/add", data).then((res) => {
        message.success(res.data.data)
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
        :rules="rules"
    >
      <n-form-item label="姓名" path="user.name">
        <n-input v-model:value="formValue.user.name" placeholder="输入姓名"/>
      </n-form-item>
      <n-form-item label="电话" path="phone">
        <n-input v-model:value="formValue.user.phone" placeholder="输入电话(长)"/>
      </n-form-item>
      <n-form-item label="性别" path="sex">
        <n-input v-model:value="formValue.user.sex" placeholder="输入性别(男|女)"/>
      </n-form-item>
      <n-form-item label="病名" path="cases">
        <n-input v-model:value="formValue.user.cases" placeholder="输入病名,‘,’分割"/>
      </n-form-item>
      <n-form-item label="紧急联系" path="relative_phone">
        <n-input v-model:value="formValue.user.relative_phone" placeholder="输入电话(长)"/>
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