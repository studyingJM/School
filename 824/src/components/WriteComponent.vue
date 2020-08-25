<template>
    <div>
        <h1>여기는 {{title}} 컴포넌트입니다.</h1>
        <div class="row">
            <div class="col-10 offset-1">
                <form>
                    <input type="hidden" :value="id" v-if="mode !== 'write'">
                    <div class="form-group">
                        <label for="title">제목</label>
                        <input v-model="todoData.title" type="text" id="title" class="form-control" placeholder="제목을 입력하세요">
                    </div>
                    <div class="form-group">
                        <label for="date">날짜</label>
                        <input v-model="todoData.date" type="date" id="date" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="content">일정 내용</label>
                        <textarea v-model="todoData.content" class="form-control" id="content" rows="3"></textarea>
                    </div>
                    <button class="btn btn-outline-info btn-sm" @click.prevent="submit">작성</button>
                </form>        
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>

<script>
export default {
    name:'writeCompo',
    data(){
        return {
            id:0,
            title:'글쓰기',
            mode: 'write',
            todoData:{
                title:'',
                content:'',
                date:''
            }
        }
    },
    methods:{
        submit(){
            let {title, content, date} = this.todoData;
            axios.post('/api/todo', {title, content, date}).then( res => {
                const data = res.data;
                
                if(data.success){
                    console.log(data, "성공");
                    this.$router.push('/'); //리스트 페이지로 이동
                }
                this.$parent.openToast(data.msg);
            })
        }
    }
}
</script>