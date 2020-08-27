<template>
    <div class="day">
        <div class="number" :class="dayClass">{{day}}</div>
        <div class="list" >
            <div class="badge badge-primary" v-for="item in data.list" :key="item.id">{{item.title}}</div>            
        </div>
    </div>
</template>

<script>
export default {
    name:"day-compo",
    props:["data", "now"],
    computed:{
        day(){
            return this.data.date.getDate();
        },
        dayClass(){
            const d = this.data.date;
            const n = this.now;
            return {
                active: d.getMonth() === n.getMonth() && d.getDate() == n.getDate(),
                disable: d.getMonth() !== n.getMonth()
            }
        }
    }
}
</script>

<style>
    .day {
        box-shadow: 2px 2px 2px 2px rgba(0,0,0, 0.2);
        border-radius: 0.25rem;
        position: relative;
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