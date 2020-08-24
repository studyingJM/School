import Vue from 'vue';
import Main from '@/Main';
import router from '@/router/route.js'
import axios from 'axios';

window.axios = axios; //전역 변수

window.onload = () => 
{
    new Vue({
        el:'#app',
        router,
        render: h => h(Main)
    });
}