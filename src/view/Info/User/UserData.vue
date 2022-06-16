<script setup lang="ts">
import {h, defineComponent, ref, watch} from 'vue'
import { NTag, NButton, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import {useStore} from "vuex";

type RowData = {
  id: number
  name: string
  age: number
  address: string
  sex: string
}

const createColumns = ({sendMail}: { sendMail: (rowData: RowData) => void }): DataTableColumns<RowData> => {
  return [
    {
      type: 'selection'
    },
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Age',
      key: 'age'
    },
    {
      title: 'Address',
      key: 'address'
    },
    {
      title: 'Sex',
      key: 'sex',
      render(row){
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
      render (row) {
        return [h(
            NButton,
            {
              size: 'small',
              onClick: () => sendMail(row)
            },
            { default: () => '查看' }
        ),h(
            NButton,
            {
              size: 'small',
              type:'error',
              style:'margin-left:6px',
              onClick: () => sendMail(row)
            },
            { default: () => '删除' }
        )]
      }
    }
  ]
}

const message = useMessage()
const data = [
  {
    id: 0,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    sex: '男'
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    sex: '男'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    sex: '男'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    sex: '男'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    sex: '男'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    sex: '男'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    sex: '男'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    sex: '男'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    sex: '男'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    sex: '男'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    sex: '男'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    sex: '男'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    sex: '男'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    sex: '男'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    sex: '男'
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    sex: '男'
  }
]
const columns=createColumns({
  sendMail (rowData) {
    message.info('send mail to ' + rowData.name)
  }
})
const store = useStore()
let town = ref(store.state.town)
watch(() => store.state.town, (newV, oldV) => {
  town.value = newV
})
const pagination = {pageSize: 10}
</script>
<template>
  <h1 class="title">{{town}}</h1>
  <div class="data">
    <n-data-table :columns="columns" :data="data" striped  :pagination="pagination" />
  </div>
</template>
<style scoped>
.data{
  width: 95%;
  margin: auto;
}
.title{
  position: relative;
  top:-50px
}
.data{
  position: relative;
  top: -50px;
}
</style>