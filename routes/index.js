var express = require('express');
const user = require('./../core/user');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  let login = req.session.login;
  if(login){
    res.redirect('/users');
    return;
  }
  res.render('index', { title: 'Express' });
});

router.get('/login',function(req,res,next){
  let login = req.session.login;
  if(login){
    res.redirect('/users');
    return;
  }
  let success = req.param('success');
  res.render('login', {title : 'Login',success : success});
});

router.get('/register',function(req,res,next){
  let login = req.session.login;
  if(login){
    res.redirect('/users');
    return;
  }
  res.render('register', {title : 'Register'});
});

router.get('/users', function(req, res, next) {
  let login = req.session.login;
  if(login){
    (req.session.user == "master")?res.render('user-master',{name :'master'}):res.render('user-common',{name :req.session.user});
    return;
  }
  res.redirect('/login');
});

router.post('/register',(req,res,next)=>{
  let userInput = {
    username: req.body.username,
    password: req.body.password
  };
  user.create(userInput, function(latsId){
    if(latsId)res.redirect('/login?success=1');
    else console.log("Error creating new user...");
  });
});

router.post('/login',(req,res,next)=>{
  user.login(req.body.username, req.body.password, function (result) {
      if(result){
        req.session.user = (req.body.username == "kingMidas")?'master':result;
        req.session.login = true;
        res.redirect('/users');
      }
      else res.send("Username/Password incorrect");
  })
});

router.get('/logout', (req,res,next)=>{
  if(req.session.user) {
      req.session.destroy(function() {
          res.redirect('/');
      });
  }
});

module.exports = router;
