<template>
    <div class="main">
        <header>
            <h1>{{msg}}</h1>
            <router-link to="/">리스트</router-link>
            <router-link to="/write">글쓰기</router-link>
        </header>
        <section class="content">
            <router-view></router-view>
        </section>
        
        <transition name="rlmove">
            <div class="my-toast" v-if="showToast">
                {{toastMsg}}
            </div>
        </transition>
        
    </div>
</template>

<style scoped>
    .my-toast {
        position: fixed;
        right:10px;
        bottom:10px;
        background-color: rgb(51, 107, 228);
        color:#fff;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding:8px 12px;
    }
    .rlmove-enter-active, .rlmove-leave-active {
        transition:opacity 0.5s, transform 0.5s;
    }

    .rlmove-enter, .rlmove-leave-to {
        opacity: 0;
        transform: translateX(100%);
    }

    .main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>

<script>
export default {
    name:'MainApp',
    data(){
        return {
            msg:'Welcome Vue.js App',
            showToast:false,
            toastMsg:'테스트 토스트 메시지입니다.'
        }
    },
    methods:{
        openToast(msg){
            this.showToast = true;
            this.toastMsg = msg;

            setTimeout(()=>{
                this.showToast = false;
            }, 2000);
        }
    }
}
</script>
