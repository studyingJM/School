<template>
    
</template>

<script>
export default {
    name:'viewComponent',
    props:['id'],
    data() {

    },
    beforeMount() {
        axios.get(`/api/todo/view?id=$(this.id)`.then( res => {
            
        });
    }
}
</script>

<style lang="stylus">

</style>