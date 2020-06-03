var express = require('express');
var app = express();
var router = express.Router()
var bodyParser = require('body-parser');
const mysql = require('mysql');


//router
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var createSurveyRouter = require('./routes/createsurvey');
var myPageRouter = require('./routes/mypage');
var signInRouter = require('./routes/signin');
var surveyDetailRouter = require('./routes/surveydetail');
var surveyListRouter = require('./routes/surveylist');
var logoutRouter = require('./routes/logout');


app.set('view engine','ejs'); // 1
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
//app.use(cookieParser());

const session = require('express-session');

//router
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var createSurveyRouter = require('./routes/createsurvey');
var myPageRouter = require('./routes/mypage');
var signInRouter = require('./routes/signin');
var surveyDetailRouter = require('./routes/surveydetail');
var surveyListRouter = require('./routes/surveylist');

 
loginRouter.use(bodyParser.json());
signInRouter.use(bodyParser.json());

app.set('view engine','ejs'); // 1
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})


app.use(session({
  key: 'id',
  secret : 'secret',
  resave : false,
  saveUninitialized : true,
  cookie : {
    maxAge : 24000*60*60
  }
}))


app.use('/',indexRouter);
app.use('/mypage',myPageRouter);
app.use('/surveylist',surveyListRouter);
app.use('/surveylist/:nameParam',surveyDetailRouter);
app.use('/create_survey',createSurveyRouter);
app.use('/signin',signInRouter);
app.use('/login',loginRouter);
app.use('/logout',logoutRouter);


var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});