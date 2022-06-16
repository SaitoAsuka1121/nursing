import {createRouter, createWebHashHistory} from "vue-router";
const routes = [

    {
        path: '/statistics' ,
        name:'statistics',
        component:()=>import('../view/Admin/Admin.vue')
    },
    {
        path: '/info/user' ,
        name:'user',
        component:()=>import('../view/Info/User/User.vue')
    },
    {
        path: '/info/elder',
        name:'elder',
        component:()=>import('../view/Info/Elder/Elder.vue')
    },
    {
        path: '/health/case',
        name:'case',
        component:()=>import('../view/Health/Case/Case.vue')
    },
    {
        path: '/health/drug',
        name:'drug',
        component:()=>import('../view/Health/Drug/Drug.vue')
    },
    {
        path: '/information/announcement',
        name:'announcement',
        component:()=>import('../view/information/announcement/Announcement.vue')
    },
    {
        path: '/information/processed',
        name:'processed',
        component:()=>import('../view/information/processed/Processed.vue')
    },
    {
        path: '/safe/accident',
        name: 'accident',
        component:()=>import('../view/Safe/Accident/Accident.vue')
    },
    {
        path: '/safe/visitorRecord',
        name: 'visitorRecord',
        component:()=>import('../view/Safe/VisitorRecord/VisitorRecord.vue')
    },
    {
        path:'/mechanism',
        name:'mechanism',
        component:()=>import('../view/Mechanism/Mechanism.vue')
    }
]
const router = createRouter({
    history:createWebHashHistory(),
    routes
})
export default router