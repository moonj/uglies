var models = require('../models'),
    mongoose = require('mongoose');

exports.add = function(req, res) {
  res.render('add');
}

exports.postAdd = function(req, res) {
  console.log(req.files.photo.name);
  var uglie = new models.Uglie({
    _creator: req.user.id,
    _owner: req.user.id,
    name: req.body.name,
    likes: [],
    path: req.files.photo.name
  });
  uglie.save(function(err) {
    if(err) console.log(err);
    else console.log('uglie saved');
  });
  res.redirect("/");
}

exports.uglie = function(req, res) {
  models.Uglie.findById(req.params.id).exec(function(err, uglie) {
    if(err) res.redirect('/');
    models.User.findById(uglie._owner).exec(function(err, user) {
      var itsYou = req.user.username == user.username;
    var data = {
      username: user.username,
      uglie: uglie,
      itsYou: itsYou 
    }
    res.render('uglie', data)
    });
  });
}

exports.trade = function(req, res) {
}

exports.deleteUglie = function(req, res) {
  models.Uglie.findById(req.params.id).remove().exec();
  res.send('hey there!');
}

exports.like = function(req, res) {
  models.Uglie.findById(req.params.id).exec(function(err, uglie) {
    for(var i = 0; i < uglie.likes.length; i++) {
      if(uglie.likes[i] == req.user.id) return;
    }
    uglie.likes.push(req.user.id);
    uglie.save();
  });
  res.send('yay!');
}
