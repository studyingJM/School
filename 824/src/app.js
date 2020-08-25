import Vue from 'vue/dist/vue';
import Main from '@/Main';
import axios from 'axios';

import router from '@/router/route.js'
import 'bootstrap/dist/css/bootstrap.css';

window.axios = axios; //전역 변수

window.onload = () => 
{
    new Vue({
        el:'#app',
        router,
        render: h => h(Main)
    });
}