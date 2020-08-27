<template>
    <div>
        <div class="row my-4">
            <div class="col-10 offset-1 d-flex justify-content-between align-items-center">
                <button class="btn btn-outline-info btn-sm">이전</button>
                <h2>일정 달력</h2>
                <button class="btn btn-outline-info btn-sm">다음</button>
            </div>
        </div>
        <div class="row">
            <div class="col-10 offser-1">
                <div class="calendar">
                    <day-compo v-for="day in list" :data="day" :key="day.idx" :now="now"></day-compo>
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
            now:undefined,
            list:[]
        }
    },
    methods:{
        drawCalendar(){
            const n = this.now;
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
        }
    },
    beforeMount(){
        this.now = new Date(); //오늘 날짜 가져와진다.
        this.drawCalendar(); //월을 집어넣어서 해당 월을 그린다.
    }
}
</script>

<style scoped>
    .calendar {
        display: grid;
        gap:10px;
        grid-template-columns: repeat(7, 1fr);
        grid-auto-rows: 120px;
        margin-bottom:20px;
    }
</style>