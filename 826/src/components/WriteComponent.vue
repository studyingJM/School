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
    props:["id"],
    data(){
        return {
            title:'글쓰기',
            mode:'write',
            todoData:{
                title:'',
                content:'',
                date:''
            }
        }
    },
    beforeMount(){
        if(this.$parent.loginUser == null){
            swal.fire('로그인후 사용할 수 있습니다.').then(res =>{
                this.$router.push('/');
                return;
            });
        }
        this.changeForm();
        if(this.mode === 'mod'){
            axios.get(`/api/todo/view?id=${this.id}`).then(res => {
                const data = res.data;
                let {title, content, date} = data.todo;
                date = date.formatDate();
                this.todoData = {title, content, date};
            }).catch(err => {
                swal.fire(err.response.data.msg);
                this.$router.push('/');
            });
        }
    },
    beforeUpdate(){
        this.changeForm();
    },
    methods:{
        changeForm(){
            if(this.id !== undefined){
                this.mode = 'mod';
                this.title = '글수정'
            }else {
                this.mode = 'write';
                this.title = '글쓰기';
            }
        },
        submit(){
            let {title, content, date} = this.todoData;
            let sendData = {title, content, date};
            if(this.id !== undefined){
                sendData.id = this.id;
            }
            axios.post('/api/todo', sendData).then( res => {
                const data = res.data;
                if(data.success){
                    this.$router.push('/'); //리스트 페이지로 이동
                }
                this.$parent.openToast(data.msg);
            })
        }
    }
}
</script>