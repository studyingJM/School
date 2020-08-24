window.onload = () => {
    let socket = io();  //서버에 소켓으로 연결

    const msg = document.querySelector("#msg");  //채팅 메시지 박스
    msg.addEventListener('keydown', e => {
        if(e.keyCode == 13) {
            document.querySelector("#btnSend").click();
        }
    });
    
    document.querySelector("#btnSend").addEventListener("click", e => {
        if(msg.value != "") {
            //emit('행동대장', 값) : 생성
            socket.emit('chat message', msg.value);
            //서버로 chat message라는 이벤트를 보내고 해당 이벤트에 사용자가 입력한 값을 보낸다.
            msg.value = ""; //인풋창을 비워주고
        }
    });

    const msgBox = document.querySelector("#msgBox");
    socket.on('receive', data => {
        let msg = document.createElement("div");
        msg.classList.add("msg");
        msg.innerHTML = data.msg;
        if(data.user == socket.id) {
            msg.classList.add("my");
            let idx = data.msg.indexOf(":");
            msg.innerHTML = data.msg.substr(idx + 1);
        }
        msgBox.appendChild(msg);
    });

    const nick = document.querySelector("#nickname");
    document.querySelector("#btnRegister").addEventListener("click", e => {
        if(nick != "") {
            socket.emit('login', nick.value);
        }
    });
    
    const popup = document.querySelector("#popup");
    socket.on('login-ok', data => {
        popup.remove();
    });


    let userList = [];
    const user = document.querySelector("#user");
    socket.on('user-list', data => {
        user.innerHTML = "";
        userList = data;
        data.forEach(u => {
            let div = document.createElement("div");
            div.classList.add("user");
            div.innerHTML = u.nickname;
            user.appendChild(div);
        });
    });
}

