import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './helpers/filters'

import '../src/assets/styles.scss';
import './assets/js/bootstrap.bundle.min.js'
import 'vue3-emoji-picker/css'

import jQuery from "jquery"
window.$ = window.jQuery = require('jquery');
import moment from 'moment';

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import VueBlocksTree from 'vue3-blocks-tree';
import 'vue3-blocks-tree/dist/vue3-blocks-tree.css';
import Vuex from 'vuex'; 


const app = createApp(App)
    .use(Vuex)
    .use(router)
    .use(store)
    .use(jQuery)
    .use(moment)
    .use(ToastPlugin,{ position: 'top-right', duration: 4000, dismissible:true})
    .use(VueBlocksTree,{treeName:'blocks-tree'})

app.config.globalProperties.$filters = filters;

app.mount('#app');
      
import axios from "axios"
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Authorization'] ='Bearer ' + localStorage.getItem('_token');
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// This code will catch 401 status returend requests 
axios.interceptors.response.use(function (response){
    // console.log(['response' , response])
    return response;
},function (error){
    if(error.response.status == 401)
    {
        if(window.location.href.indexOf("/support-chat/") > -1) {
            window.parent.postMessage(error.response.data, '*');
        } else {
            localStorage.removeItem('authData'); 
            localStorage.removeItem('_token'); 
            window.location.href = '/login'
            // router.push('/login') 
        }
    }
    window.store.commit('is_loader', false);
    return error.response;
})

import Echo from 'laravel-echo';
window.io = require('socket.io-client');
// Have this in case you stop running your laravel echo server
if (typeof io !== 'undefined') {
    window.Echo = new Echo({
        broadcaster: 'socket.io',
        namespace: 'App\\Events',
        host: process.env.VUE_APP_WEBSOCKETS_SERVER+':2096',
        authEndpoint: "/api/broadcasting/auth",
        // authEndpoint: process.env.VUE_APP_API_BASE_URL+ ":" + process.env.VUE_APP_API_PORT + "/api/broadcasting/auth",
        // wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
        // wsPort: 2096,
        auth: {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('_token'),
            },
        },
        transports: ['websocket'],
    });
    
    // window.Echo.connector.socket.on("connect", function () {
    //     console.log("---------CONNECTED---------");
    // });
    
    // window.Echo.connector.socket.on("reconnecting", function () {
    //     console.log("---------CONNECTING---------");
    // });
    
    // window.Echo.connector.socket.on("disconnect", function () {
    //     console.log("---------DISCONNECTED---------");
    // });
}