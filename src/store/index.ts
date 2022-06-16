import {createStore} from "vuex";
const store = createStore({
    state: {
        selectKey:'home',
        town:null
    },
    mutations: {
        selectKey(state,path){
            state.selectKey=path
        },
        town(state,name){
            state.town=name
        }
    },
    actions: {
    },
    getters: {
    },
    modules: {
    }
})
export default store