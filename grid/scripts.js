window.onload = () => {
    const msgList = [
        "아름다운 바다 숨 쉬는 연안 여수",
        "아름다운 여수에 어서오세요",
        "아무말이나 써봅시다. 숨쉬기 힘들어요"
    ];
    const msg = document.querySelector("#msg");
    
    let msgIdx = 0;
    
    function changeMsg() {
        let idx = 1;
        const nowMsg =  msgList[msgIdx];
        let timer = setInterval(() => {
            msg.innerHTML = nowMsg.substr(0,idx);
            idx++;
            if(idx > nowMsg.length) {
                clearInterval(timer);
                setTimeout(() => {
                    msgIdx= (msgIdx + 1) % msgList.length;
                    changeMsg();
                },1000);
            }
        },200);
    }

    changeMsg();
}