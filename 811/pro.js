const fs = require('fs');
const { exit } = require('process');

function readFilePromise(filename) {
    return new Promise( (resolve,reject) => {
        fs.readFile(filename, 'utf8', (err,data) => {
            if(err) {
                reject(err);
            }else {
                resolve(data);
            }
        });
    });
}

// readFilePromise('data.txt').then(data => {
//     console.log(data);
//     return readFilePromise('data2.txt');
// }).then(data => {
//     console.log(data);
// });

/*
readFilePromise('data3.txt').then(data => {
    console.log(data);
}).catch( err => {
    //reject 일때
    console.log(err);
});
*/

// ECMA 2017
//async : 비동기 함수(promise 그자체) -> await 가능
async function test() {
    let data1 = await readFilePromise('data.txt');
    let data2 = await readFilePromise('data2.txt');

    return data1 + data2;
}

test();
//비동기 쓰는 이유는 프로그램이 자연스럽게 흘러갈수있도록 하기 위해서이다.

test().then( data => console.log(data) );