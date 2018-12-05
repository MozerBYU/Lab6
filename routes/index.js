var express = require('express');
var router = express.Router();
var expressSession = require('express-session');

var users = require('../controllers/users_controller');
console.log("before / Route");
router.get('/', function(req, res){
    console.log("/ Route");
//    console.log(req);
    console.log(req.session);           //all the code below controls what the user can see, protects data from those not authenticated
    if (req.session.user) {             //if user is already defined
      console.log("/ Route if user");
      res.render('index', {username: req.session.username,          //render the html file specific to the user
                           msg:req.session.msg,
                           color:req.session.color});
    } else {                            //if user isn't already defined -> send it to the login page
      console.log("/ Route else user");
      req.session.msg = 'Access denied!';
      console.log("Redirecting to login page. Rendering login page.");
      res.redirect('./login');
    }
});
router.get('/user', function(req, res){     //display user info
    console.log("/user Route");
    if (req.session.user) {
      res.render('user', {msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
router.get('/signup', function(req, res){
    console.log("/signup Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('signup', {msg:req.session.msg});
});
router.get('/login',  function(req, res){
    console.log("/login Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login', {msg:req.session.msg});
});
router.get('/logout', function(req, res){   //log out
    console.log("/logout Route");
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });
router.post('/signup', users.signup);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.get('/user/profile', users.getUserProfile);


module.exports = router;