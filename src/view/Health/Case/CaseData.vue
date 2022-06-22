<script setup lang="ts">
import { h, onMounted, ref, watch } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NTag, useMessage } from 'naive-ui'
import { useStore } from 'vuex'
import axios from "axios";

type RowData = {
  id: number
  name: string
  age: number
  phone: string
  cases: []
  relative: string
  relative_phone: string
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
      key: 'cases',
      render(row) {
        return row.cases.map((caseKey) => {
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
      key: 'relative_phone'
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return  h(
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
  {
    id: 1,
    name: "马小得",
    age: 67,
    sex: '男',
    phone: 11111111111,
    cases: ['哮喘', '感冒'],
    relative: "马小溪",
    relative_phone: 22222222222
  }, {
    id: 2,
    name: "马小得",
    age: 67,
    sex: '男',
    phone: 11111111111,
    cases: ['哮喘', '感冒'],
    relative: "马小溪",
    relative_phone: 22222222222
  }, {
    id: 3,
    name: "马小得",
    age: 67,
    sex: '男',
    phone: 11111111111,
    cases: ['哮喘', '感冒'],
    relative: "马小溪",
    relative_phone: 22222222222
  }, {
    id: 4,
    name: "马小得",
    age: 67,
    sex: '男',
    phone: 11111111111,
    cases: ['哮喘', '感冒'],
    relative: "马小溪",
    relative_phone: 22222222222
  }, {
    id: 5,
    name: "马小得",
    age: 67,
    sex: '男',
    phone: 11111111111,
    cases: ['哮喘', '感冒'],
    relative: "马小溪",
    relative_phone: 22222222222
  }
])
const id = ref(null)
const showModal = ref(false)

function onNegativeClick() {
  message.success('Cancel')
  showModal.value = false
}

function onPositiveClick() {
  console.log(id.value);
  axios.get('/health/case/del', {
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
  axios.get('/health/case').then(res => {
    console.log(res.data);
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
</script>
<template>
  <h1 class="title">{{ town }}</h1>
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
</style>