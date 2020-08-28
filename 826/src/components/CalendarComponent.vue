<template>
    <div>
        <div class="row my-4">
            <div class="col-10 offset-1 d-flex justify-content-between align-items-center">
                <button class="btn btn-outline-info btn-sm" @click="prev">이전</button>
                <h2>{{current.getFullYear() }}년 {{current.getMonth() + 1 }} 월</h2>
                <button class="btn btn-outline-info btn-sm" @click="next">다음</button>
            </div>
        </div>
        <div class="row">
            <div class="col-10 offset-1">
                <div class="calendar">
                    <div class="calendar-head" v-for="lable in labelList" :key="lable">{{lable}}</div>
                    <day-compo v-for="day in list" :current="current" :data="day" :key="day.idx" :now="now"></day-compo>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DayCompo from '@/components/DayComponent';

export default {
    name:'cal-compo',
    components:{
        'day-compo':DayCompo
    },
    data(){
        return {
            labelList: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
            now:undefined,
            current:undefined,
            list:[]
        }
    },
    methods:{
        prev(){
            const n = this.current;
            this.current = new Date(n.getFullYear(), n.getMonth() - 1, 1);
            this.drawCalendar();
        },
        next(){
            const n = this.current;
            this.current = new Date(n.getFullYear(), n.getMonth() + 1, 1);
            this.drawCalendar();
        },
        drawCalendar(){
            this.list = [];
            const n = this.current;
            const start = new Date(n.getFullYear(), n.getMonth(), 1);
            const end = new Date(n.getFullYear(), n.getMonth() + 1, 0);
            
            const cStart = new Date(start.getTime());
            cStart.setDate( cStart.getDate() - start.getDay());

            const cEnd = new Date(end.getTime());
            cEnd.setDate( cEnd.getDate() + (6 - end.getDay()));

            let idx = 1;
            const day = new Date(cStart.getTime());
            while(true){
                const date = new Date(day.getTime());
                let list = [];
                this.list.push({idx, date, list});

                if(day.getDate() == cEnd.getDate() && day.getMonth() === cEnd.getMonth()){
                    break;
                }

                day.setDate(day.getDate() + 1); //하루씩 증가
                idx ++;
            }
            this.loadData();
        },
        loadData() {
            let y = this.current.getFullYear();
            let m = this.current.getMonth();
            axios.get(`/api/todo/list?y=${y}&m=${m}`).then(req => {
                const data = req.data;

                data.list.forEach(x => {
                    x.date = new Date(x.date);
                    let target = this.list.find(day => day.date.getMonth() === x.date.getMonth() && day.date.getDate() === x.date.getDate());
                    console.log(target);
                    target.list.push(x);
                });
            });
        }
    },
    beforeMount(){
        this.current = this.now = new Date(); //오늘 날짜 가져와진다.
        this.drawCalendar(); //월을 집어넣어서 해당 월을 그린다.
    }
}
</script>

<style scoped>
    .calendar {
        display: grid;
        gap:10px;
        grid-template-columns: repeat(7, 1fr);
        grid-template-rows: 30px;
        grid-auto-rows: 120px;
        margin-bottom:20px;
    }
    .calendar-head {
        background-color: rgb(54,95,230);
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 2px 2px 2px 2px rgba(54,95,230,0.3);
        border-radius: 5px;
    }
</style>