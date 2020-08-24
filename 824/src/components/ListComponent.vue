<template>
    <div>
        <h1>여기는 {{title}} 컴포넌트입니다.</h1>
        <div class="list">
            <div class="item" v-for="item in list" :key='item.id'>
                {{ item.title }} <span class="date">{{item.date}}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: 100px;
        gap:20px;
        width: 800px;
    }
    .item {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        padding: 10px;
        box-shadow: 0 0 5px 5px rgba(0,0,0,0.2);
        border-radius: 5px;
    }
</style>

//컴포넌트란? : 웹페이지의 작은 조각들
<script>
export default {
    name:'listComp',
    data() {
        return {
            title: '리스트',
            list: [],
        }
    },
    beforeMount() {
        axios.get('/api/todo').then(res => {
            this.list = res.data;
            console.log(this.list);
        });
    }
}
</script>