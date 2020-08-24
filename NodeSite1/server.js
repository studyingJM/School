const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const {con, register} = require('./db/DB');

const server = http.createServer(app);

const session = require('express-session');
const cookieSecret = 'yydh';

app.set('port', 54000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//  Model, View, Controller
//미들웨어 셋팅
app.use(session({
    resave:false,  //요청이 변경이 안되었어도 세션정보를 계속 저장
    saveUninitialized:false, //초기화되지 않은 세션들을 저장할 것인지
    secret:cookieSecret  //쿠키에 서명할 암호화키
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use( (req, res, next)=>{
    if(req.session.flashMsg !== undefined){
        res.locals.flash = req.session.flashMsg;
        delete req.session.flashMsg;
    }
    next();
});

//라우팅 작성
app.get('/', (req, res)=>{
    res.render('index');
});
app.get('/register', (req, res)=>{
    res.render('join');
});
app.post('/register', (req, res)=>{
    register(req, res, req.body);
});

server.listen(app.get('port'), ()=>{
    console.log(`Express 엔진이 ${app.get('port')}번 포트에서 실행중`);
});