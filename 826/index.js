const express = require('express');
const http = require('http');
const path = require('path');

const app = new express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieSecret = "yydh";

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:cookieSecret
}));  //세션 설정 완료하기

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const {query} = require('./DB');

app.get('/', (req, res) => {
    res.render('main');
}); 

app.get('/api/todo', async (req, res)=> {
    let list = await query("SELECT * FROM todos ORDER BY id DESC", []);
    res.json(list);
});

app.post('/api/todo', async (req, res)=>{
    let {title, content, date, id} = req.body;
    try{
        if(id === undefined){
            await query("INSERT INTO todos (title, content, date, owner) VALUES (?, ?, ?, 'gondr')", [title, content, date]);
            res.json({msg:'성공적으로 글 작성완료', success:true});
        }else {
            //현재 로그인된 유저가 이 글을 수정할 권한이 있는지를 검사해야해.
            await query("UPDATE todos SET title = ?, content = ?, date = ? WHERE id = ?", [title, content, date, id]);
            res.json({msg:'성공적으로 글 작성완료', success:true});
        }
    }catch (err){
        console.log(err);
        res.json({msg:'글 작성 중 오류 발생', success:false});
    }
});

app.delete('/api/todo', async (req, res)=>{
    let id = req.query.id;

    try {
        await query("DELETE FROM todos WHERE id = ?", [id]);
        res.json({msg:'성공적으로 글 삭제완료', success:true, id:id});
    }catch (err){
        console.log(err);
        res.json({msg:'글 삭제 중 오류 발생', success:false});
    }
});

app.get('/api/todo/view', async (req, res)=>{
    let id = req.query.id;
    try {
        let data = await query("SELECT * FROM todos WHERE id = ?", [id]);
        res.json({msg:'성공적으로 가져왔습니다.', success:true, todo:data[0]});
    }catch (err){
        console.log(err);
        //res.status(500).json({msg:'오류발생'});
        res.json({msg:'글 보기 오류 발생', success:false});
    }
});

app.post('/api/user', async (req, res)=>{
    const {id, password} = req.body;
    let result = await query("SELECT * FROM users WHERE id = ? AND password = PASSWORD(?)", [id, password]);
    if(result.length == 0){
        res.json({msg:'로그인 정보가 바르지 않습니다.', success:false});
    }else{
        req.session.user = result[0]; //유저 정보 세션에 넣어주고
        res.json({msg:'로그인 성공', success:true, user:result[0]});
    }
});

app.get('/api/user', (req,res) => {
    if(req.session.user !== undefined) {
        res.json({success:true, user:req.session.user});
    }else {
        res.json({success:false});
    }
});

app.get('/*', (req, res) =>{
    res.render('main');
});

server.listen(54000, ()=>{
    console.log("서버가 54000포트에서 구동중입니다.");
});