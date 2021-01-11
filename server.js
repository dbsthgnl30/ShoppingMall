const express =require('express');
const fs=require('fs');
const bodyParser =require('body-parser');
const app=express();
const port=process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//데이타베이스 정보 조히
const data=fs.readFileSync('./database.json');
const conf=JSON.parse(data);

//mysql 열결설정
const mysql= require('mysql');
const connection =mysql.createConnection({
  host:conf.host,
  user: conf.user,
  password: conf.password,
  port : conf.port,
  database : conf.database

});  

//mysql연결
connection.connect();


// API를 이용한 SQL조회
app.get('/api/customers',(req,res) => {

    connection.query(
      "SELECT * FROM CUSTOMER",
      (err,rows,fields) =>{
        res.send(rows);   // 값 리턴
      }
 
    );

// API를 이용한 SQL조회
app.get('/api/goodList',(req,res) => {

  connection.query(
    "SELECT * FROM CUSTOMER",
    (err,rows,fields) =>{
      res.send(rows);   // 값 리턴
    }
  );


  // API를 이용한 SQL조회
app.get('/api/goodList',(req,res) => {

  connection.query(
    "SELECT * FROM CUSTOMER",
    (err,rows,fields) =>{
      res.send(rows);   // 값 리턴
    }
  );


});


app.listen(port,()=> console.log('Listening on port 5000'));

