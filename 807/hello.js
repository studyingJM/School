//node는 모듈을 잘쓰냐 못쓰냐이다.
const fs = require("fs"); //fileSystem
const { allowedNodeEnvironmentFlags } = require("process");

let str = "Hello World";
fs.writeFile('data.txt', str, (err)=> {
    if(err) console.log(err);
    console.log('기록이 완료되었습니다.');
})
// fs.readFile('datas.txt', 'utf8', (err,data) => {
//     console.log(err);
// });