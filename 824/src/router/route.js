import Vue from 'vue';
import Router from 'vue-router';
import ListComp from '@/components/ListComponent';
import writeComp from '@/components/WriteComponent';

Vue.use(Router); //vue가 SPA를 위해 라우팅을 사용하겠다는 뜻

//주소와 매칭되는 컴포넌트 들을 여기에 적어줘야 한다.
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'list-page',
            component: ListComp
        },
        {
            path: '/write',
            name: 'write-page',
            component: writeComp
        }
    ]
});