<template>
    <div class="item">
        <div class="item-header">
            <div class="title-bar">{{item.title}}</div>
            <div class="date-box">
                <span class="date">{{formatDate}}</span>
            </div>
        </div>

        <div class="info-bar">
            <div class="button-group">
                <router-link :to="`/view/${item.id}`" class="btn btn-sm btn-outline-primary">보기</router-link>
                <button class="btn btn-sm btn-outline-danger" @click="delItem">삭제</button>
            </div>
        </div>
    </div> 
</template>

<script>

export default {
    name:"itemcompo",
    props:["item"],
    computed:{
        formatDate(){
            let value = new Date(this.item.date);
            return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
        }
    },
    methods:{
        async delItem(e){
            try {            
                let result = await swal.fire({
                    title:'정말 삭제하시겠어요?',
                    text:'삭제시 되돌릴 수 없습니다.',
                    icon:'warning',
                    showCancelButton:true,
                    confirmButtonText:'네 삭제할께요',
                    cancelButtonText:'아니요'
                });
                if(result.value){
                    let res = await axios.delete(`/api/todo?id=${this.item.id}`);
                    const data = res.data;
                    this.$emit('delete', e, data);
                    swal.fire({
                        title:'성공',
                        text:'삭제되었습니다.',
                        icon:'success'
                    });
                }
            } catch (err){
                swal.fire({
                    title:'실패',
                    text:'글 삭제중 오류가 발생했습니다.',
                    icon:'error'
                });
            }
        }
    }
}
</script>

<style scoped>
    .item-header > .title-bar {
        margin-left:-20px;
        border-radius: 0 5px 5px 0;
        padding-left:10px;
        width:100%;
        height:30px;
        background-color: #1e88e5;
        color:#fff;
        display: flex;
        align-items: center;
    }
    .item-header > .date-box {        
        display: flex;
        justify-content: flex-end;
        margin-top:8px;
    }

    .date-box > .date{
        border:1px solid #1e88e5;
        padding:2px 4px;
        font-size:12px;
        border-radius: 4px;
    }

    .item {
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        padding:20px;
        box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.1);
        border-radius: 5px;
    }
    .info-bar {
        display: flex;
        justify-content: flex-end;
    }
</style>