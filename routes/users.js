var models = require('../models');

exports.login = function(req, res) {
  res.render('login');
}

exports.postLogin = function(req, res) {
  res.redirect('/');
}

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/login');
}

exports.signup = function(req, res) {
  res.render('signup');
}

exports.postSignup = function(req, res) {
  var user = new models.User({
    username: req.body.username,
    password: req.body.password
  });
  user.save(function(err) {
    if(err) console.log(err);
    else console.log('user: ' + user.username + ' saved');
  });
  res.redirect('/login');
}

exports.friends = function(req, res) {
  var users = models.User.find({}).exec(function(err, users) {
    if(err) res.redirect('/');
    var data = {
      users: users
    }
    res.render('friends', data);
  });
}

exports.user = function(req, res) {
  var user = models.User.findById(req.params.id).exec(function(err, user) {
    if(err) {
      res.redirect('/');
      return;
    }
    if(!req.user) {
      res.redirect('/');
      return;
    }
    var uglies = models.Uglie.find({user_id: req.params.id}).exec(function(err, uglies) {
      if(err) res.redirect('/');
      var isYou;
      if(user.username == req.user.username) isYou = true;
      else isYou = false;
      var data = {
        title: user.username + '\'s Uglies',
        user: user,
        uglies: uglies,
        isYou: isYou 
      }
      res.render('index', data);
    });
  });
}
