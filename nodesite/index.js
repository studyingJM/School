const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const {con, register, login, writeBoard, list, query} = require('./db/DB');

const server = http.createServer(app);

const session = require('express-session');
const cookieSecret = 'kjmin2123';

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
    if(req.session.user != undefined){
        res.locals.user = req.session.user;
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
app.get('/login', (req, res)=>{
    res.render('login'); //login.ejs를 렌더링한다.
});
app.post('/login', (req, res)=>{
    login(req, res, req.body); //로그인 처리
});
app.get('/logout', (req, res)=>{
    delete req.session.user;
    req.session.flashMsg = {type:'success', msg:'로그아웃되었습니다.'};
    res.redirect('/'); 
});

app.get('/board', (req, res)=>{
    list(req, res);
});

app.get('/board/write', (req, res)=>{
    //로그인을 체크하는 로직이 필요함
    res.render('board/write');
});
app.post('/board/write', (req, res)=>{
    writeBoard(req, res, req.body);
});
app.get('/board/view/:id', async (req, res) => {
    let id = req.params.id;
    try {
        let result = await query("SELECT * FROM boards WHERE id = ?", [id]);
        if(result.length == 1){
            res.render('board/view', {data:result[0]});
        }else{
            res.render('error', {title:'존재하지 않는 글', msg:'해당 글은 존재하지 않습니다.'});    
        }
    }catch (err){
        console.log(err);
        res.render('error', {title:'데이터베이스 에러', msg:err.code});
    }
});

server.listen(app.get('port'), ()=>{
    console.log(`Express 엔진이 ${app.get('port')}번 포트에서 실행중`);
});

