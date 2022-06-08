<script setup lang="ts">
import {ref, reactive} from 'vue'
import {FormInst, FormItemRule, useMessage} from "naive-ui"
import axios from "axios";

defineProps<{ title: string }>()
const emit = defineEmits(["changeEmit"])
const login_ref = ref<FormInst | null>()
const message = useMessage()
const login_value = ref({
  user: {
    phone: '',
    password: '',
  }
})
const rules = {
  user: {
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
    password: {
      required: true,
      trigger: 'input',
      validator: (rule: FormItemRule, value: string) => {
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            if (value.length < 8) {
              reject(Error('密码至少为8位!'))
            } else {
              resolve()
            }
          })
        })
      }
    }
  },
}
const login = (e: MouseEvent) => {
  e.preventDefault()
  const messageReactive = message.loading('Verifying', {
    duration: 0
  })
  login_ref.value?.validate((errors) => {
    if (!errors) {
      message.success('正在登录')
      axios.post("/user/login", login_value).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    } else {
      message.error('请检查账户或密码是否符合要求!')
    }
    messageReactive.destroy()
  })
}
const send_messages = ()=>{
  emit('changeEmit',false)
}
</script>
<template>
  <div class="login-box">
    <div class="login-head">
      <h1>{{ title }}</h1>
    </div>
    <div class="form">
      <n-form ref="login_ref"
              :label-width="80"
              :model="login_value"
              :rules="rules"
              :validate-messages="message"
              :show-require-mark="false">
        <n-form-item label="账户(手机号)" path="user.phone" class="form_item">
          <n-input v-model:value="login_value.user.phone" placeholder="请输入账户"/>
        </n-form-item>
        <n-form-item label="密码" path="user.password" class="form_item">
          <n-input v-model:value="login_value.user.password" placeholder="请输入密码" type="password"/>
        </n-form-item>
        <div class="register_button">
          <n-button
              text="true"
              type="primary"
              @click="send_messages"
          >
            注册,请联系管理员
          </n-button>
        </div>
        <n-form-item class="login_button">
          <n-button @click="login" style="width: 70%" type="primary">登录</n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>
<style scoped>
.login-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  width: 350px;
  border-radius: 2%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
}
.register_button {
  position: relative;
  margin-left: 50%;
}

.form {
  margin-top: 45px;
}

.login_button :deep(.n-form-item-blank) {
  justify-content: center;
}

.form_item :deep(.n-form-item-blank) {
  justify-content: center;
}

.form_item :deep(.n-input) {
  width: 85%;
}

:deep(.n-form-item-label) {
  margin-left: 7.5%;
}
</style>