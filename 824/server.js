const express = require('express');
const path = require('path');
const http = require('http');
const { query } = require('./DB');
const bodyParser = require('body-parser');

const app = new express();
const server = http.createServer(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.render('main');
});

app.get('/api/todo', async (req,res) => {
    let list = await query("SELECT * FROM todos ORDER BY id DESC", []);
    res.json(list);
});

app.post('/api/todo', async (req,res) => {
    let sql = "INSERT INTO todos(title, content,date, owner) VALUES(?,?,?, 'aaa')";
    let {title, content, date} = req.body;
    try{
        await query(sql, [title, content, date]);
        res.json({msg:'성공적으로 글 작성 완료', success:true});
    }catch(err) {
        console.log(err);
        res.json({msg:'글 작성 중 오류 발생', success:false});
    }
});

app.delete('/api/todo', async (req,res) => {
    let id = req.query.id;
    let sql = "DELETE FROM todos WHERE id = ?";
    try{
        let del = await query(sql, [id]);
        res.json({msg:'성공적으로 글 삭제 완료', success:true , id});
    }catch(err) {
        console.log(err);        
        res.json({msg:'성공적으로 글 삭제 완료', success:true});
    }
});
server.listen(54000, () => {
    console.log("서버가 54000번 포트에서 구동중입니다.");
});