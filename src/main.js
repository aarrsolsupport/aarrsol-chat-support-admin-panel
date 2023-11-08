import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './helpers/filters'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/assets/styles.scss';
import 'bootstrap/dist/js/bootstrap.bundle'
import 'vue3-emoji-picker/css'

import jQuery from "jquery"
window.$ = window.jQuery = require('jquery');
import moment from 'moment';

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import VueBlocksTree from 'vue3-blocks-tree';
import 'vue3-blocks-tree/dist/vue3-blocks-tree.css';
import Vuex from 'vuex'; 
// import StoreData from'./store.js';

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
axios.defaults.baseURL = 'http://admin.chat-system.dll/api/'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Authorization'] ='Bearer ' + localStorage.getItem('_token');

// This code will catch 401 status returend requests 
axios.interceptors.response.use(function (response){
    // console.log(['response' , response])
    return response;
},function (error){
    // console.error(['error' , error])
    if(error.response.status == 401)
    {
        localStorage.removeItem('_token'); 
        router.push('/login') 
        window.store.commit('is_loader', false);
        return error.response;
    } else {
        return error.response;
    }
})