// const http = require('http');
// const fs = require('fs');

// const server = http.createServer( (req,res) => {
//     console.log(req);
//     fs.readFile('index.html', 'utf8', (err,data) => {
//         res.writeHead(200, {'Content-Type' : 'text/html'});
//         res.end(data);
//     });
// });

// server.on('request', e => {
//     console.log("클라이언트가 연결을 요청했습니다.");
// });

// //54000번 포트를 이용해 듣는다. 실직적 실행
// server.listen(54000, () => {
//     console.log("서버가 54000번 포트에서 구동을 시작했습니다.");
// });

/*노드는 서버에서 돌아가는 또는 브라우저 밖에서 돌아가는 JavaScript엔진
    node 자바스크립트 파일
    여러가지 모듈을 조합해서 썼다. (fs- 파일읽고쓰고, http - 웹모듈)
    간단한 파일 웹서버 -> index.html
    npm을 이용해서 모듈을 다운받았다. (express 라는 모듈),

    app을 만들어서 썼었고
    app에서 public폴더에 static resource (.html, .js, .css)
    ejs (pug) <%= %>

    app.post
*/

const express = require('express');
const http = require('http');
const path = require('path');
const { emit } = require('process');
// const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
// const io = socket(server);

//view라는 값을 현재 실행되는 폴더 밑에 views폴더로 지정한다.
app.set('views', path.join(__dirname, 'views'));

// ejs로 뷰 엔진을 지정한다.
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/chat', (req,res) => {
    res.render('chat');
});

//소켓 규칙
// io.on('이벤트이름', '헨들러 함수');
//e.target 같은 느낌. / scoket : 실시간으로 접속유지
let userList = [];
io.on('connect', (socket) => {
    console.log(socket.id + "이 접속했습니다.");

    socket.on('login', data => { //받는거
        userList.push({id:socket.id,nickname: data});
        io.emit('login-ok', {id:socket.id, nickname:data}); //보내는거
        io.emit('user-list',userList);
    });

    socket.on('disconnect', () => {
        console.log(socket.id + "가 접속을 종료했습니다.");   
        let userData = userList.findIndex(x => x.id == socket.id);
        userList.splice(userData,1);
        io.emit('user-list',userList);
    });

    socket.on('chat message', data => {
        let userData = userList.find(x => x.id == socket.id);
        io.emit('receive', {user: socket.id, msg: `${userData.nickname} : ${data}`});
    });
    //유니(귓속말), 멀티(나를 제외한 모두),브로드(모두),
}); //io에 on에는 들어오는 이벤트의 종류와 해당 이벤트를 처리할 헨들러가 작성되면 됩니다.

app.get('/hello', (req,res) => {
    res.render('hello', {msg: 'Hello World'});
});

app.get('/world', (req,res) => {
    res.render('world', {gondr: '안녕하세요'});
});

server.listen(54000, () => {
    console.log("서버가 54000포트에서 구동중입니다.");
});