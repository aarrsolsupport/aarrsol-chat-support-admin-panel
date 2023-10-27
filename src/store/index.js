import { createStore } from "vuex";

export default createStore({
    state: {
        refreshData: [],
        ag_edit: [],
        wl_edit: [],
        op_edit: [],
        change: {
            'change': 0, 
            'item': []
        },  // 0 - No change, 1 - added , 2 updated
        white_lable_change: {
            'change': 0, 
            'item': []
        },
        agent_change: {
            'change': 0, 
            'item': []
        },
        loggedIn: false,
        authData: {
            'name': '',
            'userid': '',
            'role':'',
        },
        isLoader: false,
        item_data:{},
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
            if (payload == null) {
                state.loggedIn = 0;
            } else {
                state.loggedIn = 1;
            }
            state.authData = payload
        },
        is_loader(state, payload) {
            state.isLoader = payload
        },
        ag_data_Edit(state, payload) {
            state.ag_edit = payload
        },
        wl_data_Edit(state, payload) {
            state.wl_edit = payload
        },
        op_data_Edit(state, payload) {
            state.op_edit = payload
        },
        refresh_List(state, payload) {
            state.refreshData = payload
        },
        ticket_List(state, payload) {
            state.data = payload
        },
        singledata(state, payload) {
            state.item_data = payload
        },
        data_Updated(state, payload) {
            state.change = payload
        },
        white_lable_data_Updated(state, payload) {
            state.white_lable_change = payload
        },
        agent_data_Updated(state, payload) {
            state.agent_change = payload
        },
    },
    actions: {
    }
});
