import { createStore } from "vuex";

export default createStore({
    state: {
        loggedIn: false,
        authData: {
            'name': '',
            'userid': '',
        },
        isLoader: false,
        origin_path: window.location.origin + "/",
    },
    getters: {
    },
    mutations: {
        setAuthUser(state, payload){
            console.log('setAuthUser', payload)
            state.authData = payload
            if (payload == null) {
                state.loggedIn = 0;
            } else {
                state.loggedIn = 1;
            }
        },
        is_loader(state, payload) {
            state.isLoader = payload
        },
    },
    actions: {
    }
});
