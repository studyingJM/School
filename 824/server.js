const express = require('express');
const path = require('path');
const http = require('http');
const { query } = require('./DB');

const app = new express();
const server = http.createServer(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.render('main');
});

app.get('/api/todo', async (req,res) => {
    let list = await query("SELECT * FROM todos ORDER BY id DESC", []);
    res.json(list);
});

server.listen(54000, () => {
    console.log("서버가 54000번 포트에서 구동중입니다.");
});