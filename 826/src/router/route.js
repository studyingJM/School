import Vue from 'vue';
import Router from 'vue-router';
//사용할 컴포넌트들을 가져온다.
import ListCompo from '@/components/ListComponent';
import WriteCompo from '@/components/WriteComponent';
import ViewCompo from '@/components/ViewComponent';
import LoginCompo from '@/components/LoginComponent';

Vue.use(Router); //vue가 SPA를 위해 라우팅을 사용하겠다는 뜻

//주소와 매칭되는 컴포넌트 들을 여기에 적어줘야 한다.
export default new Router({
    mode:'history',
    routes:[
        {
            path:'/',
            name:'list-page',
            component:ListCompo
        },
        {
            path:'/write',
            name:'write-page',
            component:WriteCompo
        },
        {
            path:'/mod/:id',
            name:'mod-page',
            component:WriteCompo,
            props:true
        },
        {
            //라우트에 파라미터 넣기
            path:'/view/:id',
            name:'view-page',
            component:ViewCompo,
            props:true
        },
        {
            path:'/login',
            name:'login-page',
            component:LoginCompo
        }
    ]
});