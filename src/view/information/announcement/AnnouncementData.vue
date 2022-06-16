<script setup lang="ts">
import {h, ref, watch} from 'vue'
import type {DataTableColumns} from 'naive-ui'
import {NButton, NTag, useMessage} from 'naive-ui'
import {useStore} from "vuex";

type RowData = {
  key: number
  name: string
  begin: number
  end: string
  user_name: string,
  content:string
}
const createColumns = ({sendMail}: { sendMail: (rowData: RowData) => void }): DataTableColumns<RowData> => {
  return [
    {
      type: 'selection'
    },
    {
      title: '公告名',
      key: 'name'
    },
    {
      title: '发起时间',
      key: 'begin'
    },
    {
      title: '结束时间',
      key: 'end'
    },
    {
      title: '发起者',
      key: 'user_name',
    },
    {
      title:'内容',
      key:'content'
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
const data = [
  {
    key: 0,
    name: '通告批评',
    begin:'2022-6-10',
    end:'2023-6-10',
    user_name:'root',
    content:'玩火'
  },
  {
    key: 0,
    name: '通告批评',
    begin:'2022-6-10',
    end:'2023-6-10',
    user_name:'root',
    content:'玩火'
  },
  {
    key: 0,
    name: '通告批评',
    begin:'2022-6-10',
    end:'2023-6-10',
    user_name:'root',
    content:'玩火'
  },
  {
    key: 0,
    name: '通告批评',
    begin:'2022-6-10',
    end:'2023-6-10',
    user_name:'root',
    content:'玩火'
  },
  {
    key: 0,
    name: '通告批评',
    begin:'2022-6-10',
    end:'2023-6-10',
    user_name:'root',
    content:'玩火'
  },
  {
    key: 0,
    name: '通告批评',
    begin:'2022-6-10',
    end:'2023-6-10',
    user_name:'root',
    content:'玩火'
  },
  {
    key: 0,
    name: '通告批评',
    begin:'2022-6-10',
    end:'2023-6-10',
    user_name:'root',
    content:'玩火'
  },
  {
    key: 0,
    name: '通告批评',
    begin:'2022-6-10',
    end:'2023-6-10',
    user_name:'root',
    content:'玩火'
  }
]
const message = useMessage()
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
  <div class="data">
    <n-data-table :columns="columns" :data="data" striped  :pagination="pagination" />
  </div>
</template>
<style scoped>

</style>