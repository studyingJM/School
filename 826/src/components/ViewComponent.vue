<template>
    <div>
        <div class="row">
            <div class="col-8 offset-2">
                <div class="card">
                    <div class="card-header">
                        {{todo.title}}
                    </div>
                    <div class="card-body">
                        {{todo.content}}
                    </div>
                    <div class="card-footer d-flex justify-content-end">
                        <router-link :to="`/mod/${todo.id}`" class="btn btn-outline-primary btn-sm mx-2">수정</router-link>
                        <router-link to="/" class="btn btn-outline-info btn-sm">목록</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'viewComponent',
    props:['id'],
    data(){
        return {
            todo:{} //가져올 데이터값
        }
    },
    beforeMount(){
        axios.get(`/api/todo/view?id=${this.id}`).then( res =>{
            const data = res.data;
            console.log(data);
            this.$parent.openToast(data.msg);
            if(!data.success){
                this.$router.push('/');
            }else{
                this.todo = data.todo;
            }
        });
    }
}
</script>

<style scoped>

</style>