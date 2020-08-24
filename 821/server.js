const express = require('express');
const http = require('http');
const path = require('path');
const mysql = require('mysql');

const conInfo = {
    user:'kjimin2123',
    password:'12345678',
    host:'gondr.asuscomm.com'
};

const con = mysql.createConnection(conInfo);
con.query('USE kjimin2123');

const app = express();
const server = http.createServer(app);

app.set('port', 54000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.render('index');
});
app.get('/getData', (req,res) => {
    let sql = "SELECT * FROM items";
    con.query(sql, [], (err, result)=>{
        if(err) {
            console.log(err);
        }else{
            res.json(result);
        }
    });
});
app.get('/counter', (req,res) => {
    res.render('props');
})

server.listen(app.get('port'), () => 
{
    console.log("서버가 구동되었습니다.");
});