import Vue from 'vue';
import Counter from './src/Counter'

// Vue.component('counter', Counter); //전역

window.onload = function(){
    new Vue({
        el:"#app",
        components:{
            counter: Counter //지역
        },
        data:{
            total:0
        },
        methods: {
            incTotal() {
                this.total++;
            }
        }
    })
}