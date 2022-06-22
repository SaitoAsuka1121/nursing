<script setup lang="ts">
import {h, onMounted, ref, watch} from 'vue'
import type {DataTableColumns} from 'naive-ui'
import {NButton, NTag, useMessage} from 'naive-ui'
import {useStore} from "vuex";
import axios from "axios";

type RowData = {
  key: number
  name: string
  user_name: string,
  content:string
}
const createColumns = ({sendMail}: { sendMail: (rowData: RowData) => void },{delRow}): DataTableColumns<RowData> => {
  return [
    {
      title: '消息类型',
      key: 'name'
    },
    {
      title: '申请人',
      key: 'user_name'
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
const data = ref([
  {
    name:'帮助',
    user_name:'马小跳',
    content:'我需要帮助'
  },
  {
    name:'帮助',
    user_name:'马小跳',
    content:'我需要帮助'
  },{
    name:'帮助',
    user_name:'马小跳',
    content:'我需要帮助'
  },
  {
    name:'帮助',
    user_name:'马小跳',
    content:'我需要帮助'
  }
])
const message = useMessage()
const columns=createColumns({
  sendMail (rowData) {
    message.info('send mail to ' + rowData.name)
  }
},{
  delRow(rowData) {
    showModal.value = true
    id.value = rowData.id
  }
})
const id = ref(null)
const showModal = ref(false)

function onNegativeClick() {
  message.success('Cancel')
  showModal.value = false
}

function onPositiveClick() {
  console.log(id.value);
  axios.get('/processed/del', {
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
onMounted(()=>{
  get_info()
})
const get_info = () => {
  axios.get('/processed/info').then(res => {
    data.value = res.data.data
  }).catch((err) => {
    console.log(err)
  })
}
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