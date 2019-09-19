var express = require('express');
const User = require('./../core/user');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {
  let login = req.session.login;
  if(login){
    res.render('user-common',{title : 'user'});
    return;
  }
  res.redirect('/login');
});

module.exports = router;
