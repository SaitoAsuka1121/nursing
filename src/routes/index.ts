import {createRouter, createWebHashHistory} from "vue-router";
const routes = [
    {
        path: '/' ,
        name:'head',
        component:()=>import('../view/Login/Login.vue')
    },
    {
        path: '/home' ,
        name:'home',
        component:()=>import('../view/Admin/Admin.vue')
    },
    {
        path: '/info/user' ,
        name:'user',
        component:()=>import('../view/Info/User/User.vue')
    }

]
const router = createRouter({
    history:createWebHashHistory(),
    routes
})
export default router