<template>
    <div>
        <h1>여기는 {{title}} 컴포넌트입니다.</h1>
       
        <div class="list" v-if="loginUser != null">
            <item-compo v-for="item in list" :key="item.id" :item="item" @delete="delItem"></item-compo>
        </div>
        <div class="msg" v-if="loginUser == null">
            <h2>리스트를 보기 위해선 로그인 하세요</h2>
        </div>
    </div>
</template>

<style scoped>
    .list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-auto-rows: 200px;
        gap:20px;
        width:800px;
    }

    .msg {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
</style>

<script>
import ItemCompo from '@/components/ItemComponent';

export default {
    name:'listCompo',
    components:{
        'item-compo':ItemCompo
    },
    data(){
        return {
            title:'리스트',
            list:[]
        }
    },
    methods:{
        delItem(e, data){
            if(data.success){
                let idx = this.list.findIndex( x => x.id == data.id);
                this.list.splice(idx, 1);
            }
            this.$parent.openToast(data.msg);
        },
        loadData(){
            axios.get('/api/todo').then(res => {
                this.list = res.data;
            });
        }
    },
    computed:{
        loginUser(){
            return this.$parent.loginUser;
        }
    },
    beforeMount(){
        this.loadData();
    }
}
</script>