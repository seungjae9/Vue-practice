const express = require('express');
const app = express();
const session = require('express-session');
const fs = require('fs'); // 디렉토리에 접근할수있는 모듈중에 하나(파일 시스템)

app.use(session({
    secret: 'secret code', // 세션에 대한 키(원하는 문자열)
    resave: false, // request 요청이 왔을때 세션에 수정사항이 생기지 않더라도 세션을 다시 저장하는지에 대한 설정
    saveUninitialized: false, // 세션에 저장할 내용이 없더라도 세션을 재저장할건지에 대한 설정
    cookie: {
        secure: false, // 세션 사용할려면 false로 해줘야함 (정확히 맞는지 모르겠음 ㅈㄴ 빨리 지나감)
        maxAge: 1000 * 60 * 60 // 쿠키 유효 시간 (1시간)
    }
}));


// 서버여는 함수
// 포트번호
const server = app.listen(3000, () => {
    console.log('server started. port 3000.')
});


let sql = require('./sql.js');

fs.watchFile(__dirname + '/sql.js', (curr, prev) => {                           // fs.watchFile 을 통해서 sql.js 파일을 계속 보고있다.
  console.log('sql 변경시 재시작 없이 반영되도록 함');
  delete require.cache[require.resolve('./sql.js')];                            //캐시에 sql.js 파일이 올라가있는 상태이기때문에 날려주는거다.  [require.resolve] => 해당 파일을 가져옴
  sql = require('./sql.js');
});

// db 접속 정보
const db = {
    database: "dev",
    connectionLimit: 10,
    host: "127.0.0.1",
    user: "root",
    password: "mariadb"

};

// db 연동
const dbPool = require('mysql').createPool(db);

// server post타는 거에 대한 설정
app.post('/api/login', async(request, res) => {
    request.session['email'] = 'jay@cloud-stones.com';
    res.send('ok');
});

app.post('/api/logout', async(request, res) => {
    request.session.destroy();
    res.send('ok');
});


// :alias = >api 이후 주소가 login, logout이 아닌 나머지는 여기를 타라


// 로그인을 해야만 하는 기능들은 로그인 하게
app.post('/apirole/:alias', async(request, res) => {
    // 로그인 안되면 로그인하라고 처리
    if(!request.session.email) {
        return res.status(401).send({error: 'You need to login.'})
    }

    try {
        res.send(await req.db(request.params.alias));
    } catch(err) {
        res.status(500).send({
            error: err
        })
    }
});

// 로그인이 필요없는 기능은 누구나 가능하게
app.post('/api/:alias', async(request, res) => {
    try {
        res.send(await req.db(request.params.alias));
    } catch(err) {
        res.status(500).send({
            error: err
        })
    }
});

const req = { 
    async db(alias, param = [], where = '' ) {
        return new Promise((resolve, reject) => dbPool.query(sql[alias].query + where , param, (error, rows) => {
             if ( error ) {
                if ( error.code != 'ER_DUP_ENTRY')
                    console.log(error); 
                resolve({
                    error
                });
             } else resolve(rows);
        }));
     } 
};