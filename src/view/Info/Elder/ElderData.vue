<script setup lang="ts">
import { h, defineComponent, ref, watch, onMounted, reactive } from 'vue'
import { NTag, NButton, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { useStore } from "vuex";
import axios from 'axios'
import path from 'path';

type RowData = {
  id: string
  name: string
  age: number
  address: string
  sex: string
}

const createColumns = ({ sendMail }: { sendMail: (rowData: RowData) => void }, { delRow }): DataTableColumns<RowData> => {
  return [
    {
      title: '姓名',
      key: 'name'
    },
    {
      title: '年龄',
      key: 'age'
    },
    {
      title: '地址',
      key: 'address'
    },
    {
      title: '性别',
      key: 'sex',
      render(row) {
        return h(
          NTag,
          {
            style: {
              marginRight: '6px'
            },
            type: 'info',
            bordered: false
          },
          {
            default: () => row.sex
          }
        )
      }
    },
    {
      title: '操作',
      key: 'actions',
      render(row) {
        return [h(
          NButton,
          {
            size: 'small',
            onClick: () => sendMail(row)
          },
          { default: () => '查看' }
        ), h(
          NButton,
          {
            size: 'small',
            type: 'error',
            style: 'margin-left:6px',
            onClick: () => delRow(row)
          },
          { default: () => '删除' }
        )]
      }
    }
  ]
}

const message = useMessage()

const store = useStore()
let town = ref(store.state.town)
watch(() => store.state.town, (newV, oldV) => {
  town.value = newV
})
const columns = createColumns({
  sendMail(rowData) {
    message.info('send mail to ' + rowData.name)
  },

}, {
  delRow(rowData) {
    showModal.value = true
    id.value = rowData.id
  }
})
const id = ref(null)
const get_info = () => {
  axios.get('/info/elder').then(res => {
    console.log(res.data);
    data.value = res.data.data
  }).catch((err) => {
    console.log(err)
  })
}
const data = ref([])
const pagination = { pageSize: 10 }
onMounted(() => {
  get_info()
})

const showModal = ref(false)

function onNegativeClick() {
  message.success('Cancel')
  showModal.value = false
}

function onPositiveClick() {
  console.log(id.value);
  axios.get('/user/del', {
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
</script>
<template>

  <h1 class="title">{{ town }}</h1>
  <div class="data">
    <n-data-table :columns="columns" :data="data" striped :pagination="pagination" :row-key="(rows) => rows.id" />
  </div>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" type="error" title="确认" content="你确认"
    positive-text="确认" negative-text="取消" @positive-click="onPositiveClick" @negative-click="onNegativeClick">
    这将会删除数据,且无法恢复!
  </n-modal>
</template>
<style scoped>
.data {
  width: 95%;
  margin: auto;
}

.title {
  position: relative;
  top: -50px
}

.data {
  position: relative;
  top: -50px;
}
</style>