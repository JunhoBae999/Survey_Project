var express = require('express');
var router = express.Router();
var alert = require('alert-node');
const mysql = require('mysql')


//get homepage

router.get('/', function(req,res){ // 3
    let session  = req.session;
    res.render('login',{
      session : session
    });
  });

router.post('/join',function(req,res) {
  //db connect
//create db connection
const connection= mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'wlfkf12!!',
  database : 'survey'
});

//connect
connection.connect((error)=> {
  if(error) {
    throw error;
    console.log("디ㅣㅂ연결실패");
  }
  console.log("디비 연결 완료");
});


  let session  = req.session;
   
  
  let body = req.body;
  var id = body.UID;
  var psw = body.psw;

  connection.query("SELECT *FROM user WHERE ID=?",[id],function(err,data) {
    if(data.length != null) {
       //비밀번호 확인하고
       if(psw === data[0].password) {
          req.session.uid = id;
          console.log(session.id);
          res.redirect("/");
       }
       //로그인하기      
    }
      else{
        alert("ID does not exists"); 
        res.redirect('/login');
      /*
      var query = connection.query('insert into user (id,email, uname, password) values ("' + id + '","' + email + '","' + name + '","' + passwd + '")', function(err, rows) {
          if(err) { throw err;}
          console.log("Data inserted!");
          res.render('home')
      */
      
        }
    })
}
)

  

  
module.exports = router;

