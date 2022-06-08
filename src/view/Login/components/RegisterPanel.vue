<script setup lang="ts">
import {ref, reactive} from 'vue'
import {FormInst, FormItemRule, useMessage} from 'naive-ui'
import axios from "axios";

defineProps<{ title: string }>()
const emit = defineEmits(["changeEmit"])
const register_ref = ref<FormInst | null>()
const message = useMessage()
const register_value = ref({
  user: {
    name: '',
    phone: '',
    password: '',
    check_password: ''
  }
})
const rules = {
  user: {
    name: {
      required: true,
      trigger: 'input',
      validator: (rule: FormItemRule, value: string) => {
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            if (value.length <= 1) {
              reject(Error('请输入姓名!'))
            } else {
              resolve()
            }
          })
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
    },
    check_password: {
      required: true,
      trigger: 'input',
      validator: (rule: FormItemRule, value: string) => {
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            if (value != register_value.value.user.password) {
              reject(Error('密码不一致,请检查!'))
            } else {
              resolve()
            }
          })
        })
      }
    }
  }
}
const register = (e: MouseEvent) => {
  e.preventDefault()
  const messageReactive = message.loading('Verifying', {
    duration: 0
  })
  register_ref.value?.validate((errors) => {
    if (!errors) {
      message.success('正在注册')
      axios.post("/user/register", register_value).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    } else {
      message.error('请检查表单是否符合要求!')
    }
    messageReactive.destroy()
  })
}
const send_messages = ()=>{
  emit('changeEmit',true)
}

</script>
<template>
  <div class="register-box">
    <div class="register-head">
      <h1>{{ title }}</h1>
    </div>
    <div class="register-body">
      <n-form ref="register_ref"
              :label-width="80"
              :model="register_value"
              :rules="rules"
              :validate-messages="message"
              :show-require-mark="false">
        <n-form-item label="姓名" path="user.name" class="form_item">
          <n-input v-model:value="register_value.user.name" placeholder="请输入姓名"/>
        </n-form-item>
        <n-form-item label="手机号" path="user.phone" class="form_item">
          <n-input v-model:value="register_value.user.phone" placeholder="请输入手机号"/>
        </n-form-item>
        <n-form-item label="密码" path="user.password" class="form_item">
          <n-input type="password" v-model:value="register_value.user.password" placeholder="请输入密码"/>
        </n-form-item>
        <n-form-item label="重复密码" path="user.check_password" class="form_item">
          <n-input type="password" v-model:value="register_value.user.check_password" placeholder="请再次输入密码"/>
        </n-form-item>
      </n-form>
    </div>
    <div class="register-tail">
      <div class="login-button">
        <n-button text="true" type="primary" @click="send_messages">已有账户?登录</n-button>
      </div>
      <div class="register">
        <n-button @click="register" style="width: 70%">注册</n-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.register-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  width: 350px;
  padding: 30px;
  border-radius: 2%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
}

.register-tail :deep(.n-form-item-blank) {
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

.register-tail .login-button {
  position: relative;
  margin-left: 50%;
  margin-top: -20px;
}

.register-tail .register {
  margin-top: 15px;
}
</style>