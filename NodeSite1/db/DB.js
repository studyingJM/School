//MYsql 시작
const mysql = require('mysql');
const connectionInfo = {
    user:'kjimin2123',
    password:'12345678',
    host:'gondr.asuscomm.com'
};

const con = mysql.createConnection(connectionInfo);
con.query('USE kjimin2123'); //yydev 데이터베이스를 사용하라는 뜻.
//MySQL 끝

function query(sql, data){
    return new Promise( (res, rej)=>{
        con.query(sql, data, (err, result) => {
            if(err) rej(err);
            else res(result);
        });
    });
}
//Promise : 비동기 처리에 사용되는 객체


//async : await를 실행하게 해주는거 / await : 기다리는것.

async function register(req, res, {uid, uname, upw, upwc}){
    // let {uid, uname, upw, upwc} = req.body;
    if (uid.trim() === "" || uname.trim() === "" || upw.trim() === "") {
        req.session.flashMsg = {type:'danger', msg:'필수값이 누락되었습니다.'};
        res.redirect('back');
        return;
    }
    if (upw !== upwc) {
        req.session.flashMsg = {type:'warning', msg:'비밀번호와 비밀번호 확인이 다릅니다.'};
        res.redirect('back');
        return;
    }
    try {
        let sql = "SELECT * FROM users WHERE id = ?";
        result = await query(sql, [uid]);
        if(result.length > 0){
            req.session.flashMsg = {type:'danger', msg:'이미 존재하는 회원입니다.'};
            res.redirect('back');
            return;
        }
        sql = "INSERT INTO users (id, name, password) VALUES (?, ?, PASSWORD(?))";
        result = await query(sql, [uid, uname, upw]);
        req.session.flashMsg = {type:'success', msg:'성공적으로 회원가입되었습니다.'};
        res.redirect('/');
    }catch (err){
        console.log(err);
        res.render('error', {title:'데이터베이스 에러', msg:err.code});
        return;
    }
}

module.exports.register = register;
module.exports.con = con;