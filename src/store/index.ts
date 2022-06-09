import {createStore} from "vuex";
const store = createStore({
    state: {
        selectKey:'home'
    },
    mutations: {
        selectKey(state,path){
            state.selectKey=path
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