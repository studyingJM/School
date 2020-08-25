<template>
    <div>
        <h1>여기는 {{title}} 컴포넌트입니다.</h1>
       
        <div class="list">
            <item-compo v-for="item in list" :key="item.id" :item="item" @delete="delItem"></item-compo>
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
        delItem(e, data, id){
            if(data.success) {
                let idx = this.list.findIndex( x => x.id == data.id);
                this.list.splice(idx,1);
            }
            this.$parent.openToast(data.msg);
        }
    },
    beforeMount(){
        axios.get('/api/todo').then(res => {
            this.list = res.data;
        });
    }
}
</script>