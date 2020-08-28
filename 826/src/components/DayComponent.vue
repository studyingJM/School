<template>
    <div class="day">
        <div class="number" :class="dayClass">{{day}}</div>
        <div class="list" >
            <router-link class="badge badge-primary todo" v-for="item in data.list" :key="item.id" :to="`/view/${item.id}`">{{item.title}}</router-link>            
        </div>
    </div>
</template>

<script>
export default {
    name:"day-compo",
    props:["data", "now", "current"],
    computed:{
        day(){
            return this.data.date.getDate();
        },
        dayClass(){
            const d = this.data.date;
            const c = this.current;
            const n = this.now;
            return {
                active: d.getMonth() === n.getMonth() && d.getDate() == n.getDate() && d.getFullYear() == n.getFullYear(),
                disable: d.getMonth() !== c.getMonth()
            }
        },
        view() {
            axios.get(`/api/todo/view?id=${this.data.list.id}`).then(res => {
                const data = res.data;
                console.log(data);
            });
        }
    }
}
</script>

<style scoped>
    .todo {
        width: 50%;
        text-overflow: ellipsis;
        cursor: pointer;
    }
    .day {
        box-shadow: 2px 2px 2px 2px rgba(0,0,0, 0.2);
        border-radius: 0.25rem;
        position: relative;
        width: 100%;
        overflow: hidden;
    }
    .number {
        width:25px;
        height:25px;
        border-radius: 50%;
        position: absolute;
        top:10px;
        left:10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .number.active {
        background-color: rgb(44, 64, 241);
        color:#fff;
    }
    .number.disable {
        color:#ddd;
    }
    .list{
        margin-top:35px;
    }
</style>