<script setup lang="ts">
import {h} from 'vue'
import type {DataTableColumns} from 'naive-ui'
import {NButton, NTag, useMessage} from 'naive-ui'

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
        return h(
            NButton,
            {
              size: 'small',
              onClick: () => sendMail(row)
            },
            { default: () => '查看' }
        )
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
</script>
<template>
  <div class="data">
    <n-data-table :columns="columns" :data="data" striped  :pagination="pagination" />
  </div>
</template>
<style scoped>

</style>