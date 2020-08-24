<template>
    <div>
        <p>{{count}} / {{abc}} / {{asd}} / {{total}}</p>
        <button @click="inc">증가</button>
    </div>
</template>

<style scoped>
    p {
        color: #fff;
        background-color: rgb(65,113,218);
    }
</style>

<script>
export default {
    name:'counter',
    props:['abc','asd','total'],
    data(){
        return {
            count:0
        }
    },
    methods:{
        inc(){
            this.count++;
            this.$emit("jm");
            // this.$root.total++; //안쓰는게 좋음
        }
    }
}
</script>