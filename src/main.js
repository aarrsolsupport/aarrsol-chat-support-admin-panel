import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../src/assets/styles.scss';
import 'bootstrap/dist/js/bootstrap.bundle'

import jQuery from "jquery"
window.$ = window.jQuery = require('jquery');

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

createApp(App)
    .use(router)
    .use(store)
    .use(jQuery)
    .use(ToastPlugin,{ position: 'top-right', duration: 4000, dismissible:true})
    .mount('#app')

import axios from "axios"
window.axios = require('axios');
axios.defaults.baseURL = 'http://admin.chat-system.dll/api/'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Authorization'] ='Bearer ' + localStorage.getItem('_token');

// This code will catch 401 status returend requests 
window.axios.interceptors.response.use(function (response){
    console.log(['response' , response])
    return response;
},function (error){
    console.error(['error' , error])
    if(error.response.status == 401)
    {
        localStorage.removeItem('_token'); 
        router.push('/login') 
        return error.response;
    } else {
        return error.response;
    }
})