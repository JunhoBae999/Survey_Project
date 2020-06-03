var express = require('express');
var router = express.Router();
var alert = require('alert-node');
const mysql = require('mysql')

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




//get homepage
router.get('/', function(req,res){ // 3
    session = req.session;
    res.render('signin', {
      session : session
    });
  });

router.post('/join', function(req,res){
    var body = req.body;
    var email = body.email;
    var id = body.uid;
    var name = body.uname;
    var passwd = body.psw;
    var passwd_rep = body.psw_repeat;

    connection.query("SELECT *FROM user WHERE ID=?",[id],function(err,data) {
        if(data.length == 0) {
          if(passwd !== passwd_rep) {
            alert("Password and Password-repeat deos not match");
          }
          else{
          console.log(passwd);
          var query = connection.query('insert into user (id,email, password, uname) values ("' + id + '","' + email + '","' + passwd + '","' + name + '")', function(err, rows) {
              if(err) { throw err;}
              console.log("Data inserted!");
              res.render('home')
          })
        }
        }
        else {
          alert("ID already exists");
        }
    })


})



module.exports = router;


