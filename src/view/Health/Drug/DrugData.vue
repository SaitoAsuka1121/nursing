<script setup lang="ts">
import {h, ref, reactive, watch, onMounted} from 'vue'
import type {DataTableColumns  } from 'naive-ui'
import {NButton, NTag, useMessage} from 'naive-ui'
import {useStore} from "vuex";
import axios from "axios";
import { FlashOutline as FlashOutline } from "@vicons/ionicons5";
type RowData = {
  id: number
  name: string
  begin: number
  end: string
  price: number
}
const createColumns = ({delRow}): DataTableColumns<RowData> => {
  return [
    {
      title: '药品名',
      key: 'name'
    },
    {
      title: '生产日期',
      key: 'begin'
    },
    {
      title: '过期日期',
      key: 'end'
    },
    {
      title: '价格/盒',
      key: 'price',
    },
    {
      title: '操作',
      key: 'actions',
      render (row) {
        return h(
            NButton,
            {
              size: 'small',
              type:'error',
              style:'margin-left:6px',
              onClick: () => delRow(row)
            },
            { default: () => '删除' }
        )
      }
    }
  ]
}
const data =ref( [
  {
    key: 0,
    name: '速效救心丸',
    begin:'2022-6-10',
    end:'2023-6-10',
    price:'100'
  },
  {
    key: 1,
    name: '速效救心丸',
    begin:'2022-6-10',
    end:'2023-6-10',
    price:'100'
  },
  {
    key:2,
    name: '速效救心丸',
    begin:'2022-6-10',
    end:'2023-6-10',
    price:'100'
  },
  {
    key: 3,
    name: '速效救心丸',
    begin:'2022-6-10',
    end:'2023-6-10',
    price:'100'
  },
  {
    key: 4,
    name: '速效救心丸',
    begin:'2022-6-10',
    end:'2023-6-10',
    price:'100'
  }
])
const message = useMessage()
const id = ref(null)

const columns=createColumns({
  delRow(rowData) {
    showModal.value = true
    id.value = rowData.id
  }
})
const showModal = ref(false)

function onNegativeClick() {
  message.success('Cancel')
  showModal.value = false
}

function onPositiveClick() {
  console.log(id.value);
  axios.get('/drug/del', {
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
  axios.get('/drug/all').then(res => {
    console.log(res.data);
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
const checkedRowKeysRef = ref<[]>([])
const rowKey=(row:RowData)=>row.id
const handleCheck=(rowKeys:[])=>{
  checkedRowKeysRef.value = rowKeys
}
const input_value = ref('')
const search = () => {
  console.log(input_value.value);

  axios.get('/drug/like', {
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
      <n-input-group-label>药品名</n-input-group-label>
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
    <n-data-table
        :columns="columns"
        :data="data" striped
        :pagination="pagination"
        :row-key="rowKey"
        @update:checked-row-keys="handleCheck"/>
  </div>
  <n-modal v-model:show="showModal" :mask-closable="false" preset="dialog" type="error" title="确认" content="你确认"
           positive-text="确认" negative-text="取消" @positive-click="onPositiveClick" @negative-click="onNegativeClick">
    这将会删除数据,且无法恢复!
  </n-modal>
</template>
<style scoped>
.title{
  position: relative;
  top:-50px
}
.data{
  position: relative;
  top: -50px;
}
.input {
  position: absolute;
  top: -96px;
  left: 100px;
  width: 1000px;
  z-index:999;
}

.input-button {
  position: absolute;
  top: -96px;
  left: 673px;
  width: 60px;
  z-index: 1000;
}
</style>