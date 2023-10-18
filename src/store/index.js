import { createStore } from "vuex";

export default createStore({
    state: {
        refreshData: [],
        edit: [],
        change: {
            'change': 0, 
            'item': []
        },  // 0 - No change, 1 - added , 2 updated
        white_lable_change: {
            'change': 0, 
            'item': []
        },  // 
        loggedIn: false,
        authData: {
            'name': '',
            'userid': '',
        },
        isLoader: false,
        origin_path: window.location.origin + "/",
        ticket_status: {
            0: {
                text: 'Open',
                theme: 'open-thm'
            },
            1: {
                text: 'Close',
                theme: 'close-thm'
            },
            2: {
                text: 'Pending',
                theme: 'pending-thm'
            },
        }
    },
    getters: {
    },
    mutations: {
        setAuthUser(state, payload){
            console.log('setAuthUser', payload)
            // *TO-DO*
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
        data_Edit(state, payload) {
            state.edit = payload
        },
        data_Updated(state, payload) {
            state.change = payload
        },
        refresh_List(state, payload) {
            state.refreshData = payload
        },
        agent_update_data(state, payload) {
            state.agent_update_data_change = payload
        }
    },
    actions: {
    }
});
