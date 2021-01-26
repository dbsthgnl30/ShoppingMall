
//모듈 호출
const express     = require('express');  //require 컴포넌트 호출
const fs          = require('fs');   //fs 파일시스템
const bodyParser  = require('body-parser');
const mysql       = require('mysql');
const multer      = require('multer');//multer라이브러리 불러옴

//서버 환경정보(port) 와 수신된데이타를 파싱하는 방법
const appServer   = express();
const port        = process.env.PORT || 5000;

appServer.use(bodyParser.json());
appServer.use(bodyParser.urlencoded({extended:true}));

//데이타베이스 정보를 읽어서 초기화
const data    = fs.readFileSync('./database.json'); //데이타베이스 환경정보를 읽어서  DATA변수에 넣어준다
const conf    = JSON.parse(data);

const connection =mysql.createConnection({
  host:conf.host,
  user: conf.user,
  password: conf.password,
  port : conf.port,
  database : conf.database

});  

connection.connect();


// API를 이용한 SQL조회
appServer.get('/api/products',(req,res) => {

    connection.query(
      "SELECT * FROM TB_PRODUCT",
      (err,rows,fields) =>{
        console.log(err)   
        
        res.send(rows);   // 값 리턴
        if(err){
          console.log(err)   
        }
        console.log(rows)
      }
  
      
    );
  });

//
appServer.use('/image', express.static('./upload'));

  const upload= multer({dest:'./upload'})//사용자 파일 업로드 폴더=서버에 기본  루트 폴더에 있는 업로드 폴더

appServer.post('/api/customers/add',upload.single('image'),(req,res) =>{
    
    
      console.log(req.body);
      let sql         = 'INSERT INTO CUSTOMER VALUES (null,?,?,?,?,?,?,?)';

      
      let image       = '/image/'+ req.file.filename;
      let name        = req.body.name;
      let birthday    = req.body.birthday;
      let gender      = req.body.gender;
      let job         = req.body.job;
      let createdDate = new Date();
      let isDeleted   = 0;
      let params      = [image,name,birthday,gender,job,createdDate,isDeleted];

      connection.query(sql,params,
        (err,rows,fields) =>{
          res.send(rows);   // 값 리턴

          if(err !=null){
            console.log(err);
          }  
        }
  
      );
      
  });

  
  // API를 이용한 SQL조회
 appServer.delete('/api/customers/:id',(req,res) => {

    console.log(req.params);

    let sql='UPDATE CUSTOMER SET isDeleted =1 WHERE id=?';
    let params=[req.params.id];
    connection.query(sql,params,
      (err,rows,fields) =>{
        res.send(rows); 

        if(err !=null){
          console.log(err);
        }  
    }
  );


});

  

appServer.listen(port,()=> console.log('Listening on port 5000'));