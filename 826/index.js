const express = require('express');
const http = require('http');
const path = require('path');

const app = new express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieSecret = "kjimin2123";

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

Date.prototype.toStr = function(){
    let y = this.getFullYear();
    let m = `00${this.getMonth() + 1}`;
    let d = `00${this.getDate()}`;
    m = m.substr(m.length - 2);
    d = d.substr(d.length - 2);
    return `${y}-${m}-${d}`;
};

app.get('/', (req, res) => {
    res.render('main');
}); 

app.get('/api/todo', async (req, res)=> {
    if(req.session.user === undefined){
        res.json([]);    
        return;
    }
    const user = req.session.user;
    let list = await query("SELECT * FROM todos WHERE owner = ? ORDER BY id DESC", [user.id]);
    res.json(list);
});

//년도와 월이 넘어온다.
app.get('/api/todo/list', async (req, res)=>{
    const {y, m} = req.query;  
    if(y === undefined || m === undefined){
        res.json({msg:'잘못된 요청입니다.'});
        return;
    }

    if(req.session.user === undefined){
        res.json({list:[]});
        return;
    }

    const start = new Date(y, m , 1); //해당월의 시작일
    const end = new Date(y, m * 1 + 1, 0); //해당월의 마지막날
    const user = req.session.user;
    const sql = "SELECT * FROM todos WHERE owner = ? AND date BETWEEN ? AND ?";
    try {
        let result = await query(sql, [ user.id, start.toStr(), end.toStr()]);
        res.json({list:result})    
    }catch(err){
        console.log(err);
        res.json({list:[], msg:'실패', success:false});
    }
    
});


app.post('/api/todo', async (req, res)=>{
    let {title, content, date, id} = req.body;
    if(req.session.user === undefined){
        res.status(403).json({msg:'권한이 없습니다'});
        return;
    }
    try{
        if(id === undefined){
            await query("INSERT INTO todos (title, content, date, owner) VALUES (?, ?, ?, ?)", [title, content, date, req.session.user.id]);
            res.json({msg:'성공적으로 글 작성완료', success:true});
        }else {
            //현재 로그인된 유저가 이 글을 수정할 권한이 있는지를 검사해야해.
            let data = await query("SELECT * FROM todos WHERE id = ?", [id]);
            if(data[0].owner !== req.session.user.id){
                res.status(403).json({msg:'권한이 없습니다'});
                return; 
            }
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
        if(req.session.user === undefined || data[0].owner !== req.session.user.id){
            res.status(403).json({msg:'권한이 없습니다.'});    
            return;
        }
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

app.get('/api/user', (req, res)=>{
    if(req.session.user !== undefined){
        res.json({success:true, user:req.session.user});
    }else{
        res.json({success:false});
    }
});

app.delete('/api/user', (req, res)=>{
    if(req.session.user !== undefined){
        req.session.user = undefined;
    }
    res.json({success:true, msg:'로그아웃되었습니다.'});
});

app.get('/*', (req, res) =>{
    res.render('main');
});

server.listen(54000, ()=>{
    console.log("서버가 54000포트에서 구동중입니다.");
});