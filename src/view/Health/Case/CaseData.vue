<script setup lang="ts">
import {h,onMounted,ref,watch} from 'vue'
import type {DataTableColumns} from 'naive-ui'
import {NButton, NTag, useMessage} from 'naive-ui'
import { useStore } from 'vuex'

type RowData = {
  key: number
  name: string
  age: number
  phone: string
  cases: []
  relative:string
  relative_phone:string
}

const createColumns = ({sendMail}: { sendMail: (rowData: RowData) => void }): DataTableColumns<RowData> => {
  return [
    {
      type: 'selection'
    },
    {
      title: '姓名',
      key: 'name'
    },
    {
      title: '年龄',
      key: 'age'
    },
    {
      title: '电话',
      key: 'phone'
    },
    {
      title: 'Sex',
      key: 'sex',
    },
    {
      title:'亲戚',
      key:'relative'
    },
    {
      title:'病名',
      key:'cases',
      render(row){
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
      title:'联系方式',
      key:'relative_phone'
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
    name: 'John Brown',
    age: 32,
    phone: '110',
    sex:'男',
    relative: '王',
    relative_phone:'123341',
    cases:['耐多药肺结核、艾滋病机会性感染、血友病、唇腭裂、I型糖尿病、甲亢、急性心肌梗塞、脑梗死、中晚期肝硬化...']
  },
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    phone: '110',
    sex:'男',
    relative: '王',
    relative_phone:'123341',
    cases:['冠心病,感冒']
  },
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    phone: '110',
    sex:'男',
    relative: '王',
    relative_phone:'123341',
    cases:['冠心病,感冒']
  },
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    phone: '110',
    sex:'男',
    relative: '王',
    relative_phone:'123341',
    cases:['冠心病,感冒']
  },
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    phone: '110',
    sex:'男',
    relative: '王',
    relative_phone:'123341',
    cases:['冠心病,感冒']
  },
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    phone: '110',
    sex:'男',
    relative: '王',
    relative_phone:'123341',
    cases:['冠心病,感冒']
  },
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    phone: '110',
    sex:'男',
    relative: '王',
    relative_phone:'123341',
    cases:['冠心病,感冒']
  },
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    phone: '110',
    sex:'男',
    relative: '王',
    relative_phone:'123341',
    cases:['冠心病,感冒']
  },
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    phone: '110',
    sex:'男',
    relative: '王',
    relative_phone:'123341',
    cases:['冠心病,感冒']
  },
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    phone: '110',
    sex:'男',
    relative: '王',
    relative_phone:'123341',
    cases:['冠心病,感冒']
  },
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    phone: '110',
    sex:'男',
    relative: '王',
    relative_phone:'123341',
    cases:['冠心病,感冒']
  }
]
const message = useMessage()
const columns=createColumns({
  sendMail (rowData) {
    message.info('send mail to ' + rowData.name)
  }
})
const pagination = {pageSize: 10}
const store = useStore()
let town = ref(store.state.town)
watch(() => store.state.town, (newV, oldV) => {
  town.value = newV
})
onMounted(()=>{

})
</script>
<template>
  <h1 class="title">{{town}}</h1>
  <div class="data">
    <n-data-table :columns="columns" :data="data" striped  :pagination="pagination" />
  </div>
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
</style>