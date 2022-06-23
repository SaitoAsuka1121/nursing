<script setup lang="ts">
import { h, onMounted, ref, watch } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NTag, useMessage } from 'naive-ui'
import { useStore } from 'vuex'
import axios from "axios";
import { FlashOutline as FlashOutline } from "@vicons/ionicons5";
type RowData = {
  id: number
  name: string
  age: number
  phone: string
  cases: []
  relative: string,
  list: [],
  rePhone: string
}

const createColumns = ({ sendMail }: { sendMail: (rowData: RowData) => void }, { delRow }): DataTableColumns<RowData> => {
  return [
    {
      title: '姓名',
      key: 'name'
    },
    {
      title: '性别',
      key: 'sex',
    },
    {
      title: '电话',
      key: 'phone'
    },
    {
      title: '病名',
      key: 'list',
      render(row) {
        return (row.list || []).map((caseKey) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: 'error',
              bordered: false
            },
            {
              default: () => caseKey
            }
          )
        })
      }
    },
    {
      title: '紧急联系',
      key: 'rePhone'
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            size: 'small',
            type: 'error',
            onClick: () => delRow(row)
          },
          { default: () => '删除' }
        )
      }
    }
  ]
}
const data = ref([
])
const id = ref(null)
const showModal = ref(false)

function onNegativeClick() {
  message.success('Cancel')
  showModal.value = false
}

function onPositiveClick() {
  console.log(id.value);
  axios.get('/case/del', {
    params: {
      id: id.value
    }
  }).then((res) => {
    if (res.data.code == 200) {
      message.success("删除成功");
      get_info()
    } else {
      message.error("删除失败")
    }


  })
  showModal.value = false

}

onMounted(() => {
  get_info()
})
const get_info = () => {
  axios.get('/case/all').then(res => {

    data.value = res.data.data
  }).catch((err) => {
    console.log(err)
  })
}
const message = useMessage()
const columns = createColumns({
  sendMail(rowData) {
    message.info('send mail to ' + rowData.name)
  }
}, {
  delRow(rowData) {
    showModal.value = true
    id.value = rowData.id
  }
})
const pagination = { pageSize: 10 }
const store = useStore()
let town = ref(store.state.town)
watch(() => store.state.town, (newV, oldV) => {
  town.value = newV
})
const input_value = ref('')
const search = () => {
  console.log(input_value.value);

  axios.get('/case/like', {
    params: {
      name: input_value.value
    }
  }).then(res => {

    data.value = res.data.data
  }).catch((err) => {
    console.log(err)
  })

}
</script>
<template>
  <div class="input">
    <n-input-group>
      <n-input-group-label>老人姓名</n-input-group-label>
      <n-input round placeholder="搜索" :style="{ width: '33%' }" v-model:value="input_value" :autofocus="true">
        <template #prefix>
          <n-icon :component="FlashOutline" />
        </template>
      </n-input>
    </n-input-group>
  </div>
  <div class="input-button">
    <n-button @click="search">搜索</n-button>
  </div>
  <div class="data">
    <n-data-table :columns="columns" :data="data" striped :pagination="pagination" />
  </div>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" type="error" title="确认" content="你确认"
    positive-text="确认" negative-text="取消" @positive-click="onPositiveClick" @negative-click="onNegativeClick">
    这将会删除数据,且无法恢复!
  </n-modal>
</template>
<style scoped>
.title {
  position: relative;
  top: -50px
}

.data {
  position: relative;
  top: -50px;
}

.input {
  position: absolute;
  top: -96px;
  left: 193px;
  width: 1000px;
  z-index: 999;
}

.input-button {
  position: absolute;
  top: -96px;
  left: 193px;
  width: 1000px;
  z-index: 999;
}
</style>