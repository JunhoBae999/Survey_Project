var express = require('express');
var router = express.Router();

//get homepage

router.get('/', function(req,res){ // 3
    res.render('signin');
  });
  
module.exports = router;


