import Vue from 'vue';
import axios from 'axios';

window.onload = ()=>{
    new Vue({
        el: "#app",
        data:{
            items:[],
        },
        beforeMount(){
            axios.get('/getData').then(res => {
                this.items = res.data;
            });
        }
    });
}