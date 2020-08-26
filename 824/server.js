const express = require('express');
const http = require('http');
const path = require('path');

const app = new express();
const server = http.createServer(app);
const bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

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
    let {title, content, date} = req.body;
    try{
        await query("INSERT INTO todos (title, content, date, owner) VALUES (?, ?, ?, 'gondr')", [title, content, date]);
        res.json({msg:'성공적으로 글 작성완료', success:true});
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

server.listen(54000, ()=>{
    console.log("서버가 54000포트에서 구동중입니다.");
});