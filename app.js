import Vue from 'vue';
import axios from 'axios';

window.onload = ()=>{
    Vue.component('my-hello', {
        template: 
                `<div id="id">
                    <header><slot name="header"></slot></header>
                    <section><slot></slot></section>
                    <p>{{count}}</p>
                    <button @click="inc">+</button>
                    <footer><slot name="footer"></slot></footer>
                </div>`,
        data() {
            return {
                count:0
            };
        },
        methods: {
            inc() {
                this.count++;
            }
        }
        });
    new Vue({
        el: "#app",
        data:{
            items:[],
            red:false,
            green:false,
            boxStyleObj:{
                color:'#fff',
                'border-radius':'5px',
                'display':'flex'
            }
        },
        methods:{
            changeClass(){
                this.boxClassObj.red = !this.boxClassObj.red;
                this.boxClassObj.green = !this.boxClassObj.green;
            }
        },
        //계산된 결과값
        computed: {
            boxClassObj(){
                return {
                    red:this.red,
                    green:this.green
                };
            }
        },
        beforeMount(){
            axios.get('/getData').then(res => {
                this.items = res.data;
            });
        }
    });
}