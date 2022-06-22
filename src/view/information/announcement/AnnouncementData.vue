<script setup lang="ts">
import {h, onMounted, ref, watch} from 'vue'
import type {DataTableColumns} from 'naive-ui'
import {NButton, NTag, useMessage} from 'naive-ui'
import {useStore} from "vuex";
import axios from "axios";

type RowData = {
  id: number
  name: string
  begin: number
  end: string
  user_name: string,
  content:string
}
const createColumns = ({sendMail}: { sendMail: (rowData: RowData) => void },{delRow}): DataTableColumns<RowData> => {
  return [
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
              onClick: () => delRow(row)
            },
            { default: () => '删除' }
        )]
      }
    }
  ]
}
const data = ref([])
const id = ref(null)
const showModal = ref(false)

function onNegativeClick() {
  message.success('Cancel')
  showModal.value = false
}

function onPositiveClick() {
  console.log(id.value);
  axios.get('/announcement/del', {
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
  axios.get('/announcement/info').then(res => {
    data.value = res.data.data
  }).catch((err) => {
    console.log(err)
  })
}
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
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" type="error" title="确认" content="你确认"
           positive-text="确认" negative-text="取消" @positive-click="onPositiveClick" @negative-click="onNegativeClick">
    这将会删除数据,且无法恢复!
  </n-modal>
</template>
<style scoped>

</style>