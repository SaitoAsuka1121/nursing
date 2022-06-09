<script setup lang="ts">
import {h, defineComponent, ref, Component, onMounted, watch} from 'vue'
import {NIcon} from 'naive-ui'
import type {MenuOption} from 'naive-ui'
import {useRouter} from 'vue-router'
import {useStore} from "vuex";
import {
  HomeOutline as HomeIcon,
  BarChartSharp as BarIcon,
  DocumentTextOutline as DocumentTextIcon,
  HeartOutline as HeartIcon,
  RestaurantOutline as RestaurantIcon,
  NotificationsOutline as NotificationsIcon,
  HandLeftOutline as HandLeftIcon,
  BuildOutline as BuildIcon
} from '@vicons/ionicons5'
import Top from "./Top.vue";
import MiNiBar from "./MiNiBar.vue";
import {RouterLink} from "vue-router";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, {default: () => h(icon)})
}

const inverted = true
const menuOptions: MenuOption[] = [
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: 'head',
                params: {}
              }
            },
            {default: () => '首页'}
        ),
    key: 'home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: 'statistics',
                params: {}
              }
            },
            {default: () => '统计信息'}
        ),
    key: 'statistics',
    icon: renderIcon(BarIcon),
  },
  {
    label: '信息管理',
    key: 'info',
    icon: renderIcon(DocumentTextIcon),
    children: [
      {
        label: () =>
            h(
                RouterLink,
                {
                  to: {
                    name: 'elder',
                    params: {}
                  }
                },
                {default: () => '老人信息'}
            ),
        key: 'elder',
      },
      {
        label: () =>
            h(
                RouterLink,
                {
                  to: {
                    name: 'user',
                  }
                },
                {default: () => '用户信息'}
            )
        ,
        key: 'user',
      }
    ]
  },
  {
    label: '健康管理',
    key: 'health',
    icon: renderIcon(HeartIcon),
    children: [
      {
        label: () =>
    h(
        RouterLink,
        {
          to: {
            name: 'case',
          }
        },
        {default: () => '病历信息'}
    ),
        key: 'caseHistory',
      },
      {
        label: () =>
            h(
                RouterLink,
                {
                  to: {
                    name: 'drug',
                  }
                },
                {default: () => '药品信息'}
            ),
        key: 'drug',
      }
    ]
  },

  {
    label: '消息处理',
    key: 'informationProcessing',
    icon: renderIcon(NotificationsIcon),
    children: [
      {
        label: () =>
            h(
                RouterLink,
                {
                  to: {
                    name: 'tobeprocessed',
                  }
                },
                {default: () => '待处理'}
            ),
        key: 'toBeProcessed'
      },
      {
        label:  () =>
            h(
                RouterLink,
                {
                  to: {
                    name: 'processed',
                  }
                },
                {default: () => '已处理'}
            ),
        key: 'processed'
      },
      {
        label:  () =>
            h(
                RouterLink,
                {
                  to: {
                    name: 'announcement',
                  }
                },
                {default: () => '公告'}
            ),
        key: 'announcement'
      }
    ]
  },
  {
    label: '安全管理',
    key: 'safe',
    icon: renderIcon(BuildIcon),
    children: [
      {
        label: () =>
            h(
                RouterLink,
                {
                  to: {
                    name: 'accident',
                  }
                },
                {default: () => '事故记录'}
            ),
        key: 'accident'
      },
      {
        label: () =>
            h(
                RouterLink,
                {
                  to: {
                    name: 'visitorRecord',
                  }
                },
                {default: () => '访客记录'}
            ),
        key: 'visitorRecord'
      }
    ]
  }
]
const store = useStore()
let selectKey = ref(store.state.selectKey)
watch(()=>store.state.selectKey,(newV,oldV)=>{
  selectKey.value=newV
})
const collapsed = ref(false)
const sendBack = (val: boolean) => {
  console.log(val)
  collapsed.value = val
}
</script>
<template>
  <div class="nav-box">
    <n-space vertical>
      <n-layout has-sider>
        <n-layout-sider
            bordered
            :collapsed="collapsed"
            collapse-mode="width"
            :collapsed-width="64"
            :width="200"
            :inverted="inverted"
            @collapse="collapsed = true"
            @expand="collapsed = false"
        >
          <n-scrollbar>
            <n-menu
                :collapsed="collapsed"
                :inverted="inverted"
                :value="selectKey"
                :collapsed-width="64"
                :collapsed-icon-size="22"
                :options="menuOptions"
            />
          </n-scrollbar>
        </n-layout-sider>
        <n-layout>
          <div class="top">
            <Top @sendBack="sendBack"/>
          </div>
          <div class="mini-nav">
            <MiNiBar/>
          </div>
          <div class="content">
            <slot></slot>
          </div>
        </n-layout>
      </n-layout>
    </n-space>
  </div>
</template>
<style scoped>
:deep(.n-menu-item-content--selected) {
  --n-item-color-active: #2d8cf0;
  --n-item-color-active-hover: #2d8cf0;
  --n-item-color-active-collapsed: #2d8cf0;
}

:deep(.n-menu) {
  height: 960px;
}

:deep(.n-menu-item-content) {
  padding-right: 45px;
}

:deep(.n-submenu) {
  margin-top: 9px;
}

.top {
  height: 64px;
  background-color: #ffffff;
}

.mini-nav {
  height: 44px;
  background-color: #f5f7f9;
}

</style>