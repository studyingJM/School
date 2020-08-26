import Vue from 'vue';
import Main from '@/Main';
import axios from 'axios';

import router from '@/router/route.js'

import 'bootstrap/dist/css/bootstrap.min.css';

window.axios = axios;

String.prototype.formatDate = function(){
    let value = new Date(this);
    let month = "00" + (value.getMonth() + 1);
    month = month.substr(month.length - 2);
    let day = "00" + value.getDate();
    day = day.substr(day.length - 2);
    return `${value.getFullYear()}-${month}-${day}`;
}

window.onload = ()=>{
    new Vue({
        el:"#app",
        router,
        render: h => h(Main)
    })
}