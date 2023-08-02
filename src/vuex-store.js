import { createStore } from 'vuex'

const store = createStore({
    state: {
        loggedIn: false,
        role: null,
    },
    getters: {
        getLoggedIn: (state) => state.loggedIn,
        getRole: (state) => state.role
    },
    mutations: {
        setLoggedIn(state, value) {
            state.loggedIn = value
        },
        setRole(state, value) {
            state.role = value
        }
    },
    actions: {
    },
    modules: {
    }
})

export default store