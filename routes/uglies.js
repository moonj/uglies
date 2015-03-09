var models = require('../models');

exports.add = function(req, res) {
  res.render('add');
}

exports.postAdd = function(req, res) {
  console.log(req.files.photo.name);
  var uglie = new models.Uglie({
    user_id: req.user.id,
    name: req.body.name,
    likes: 0,
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
    models.User.findById(uglie.user_id).exec(function(err, user) {
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
  console.log('hello?');
  res.send('hey there!');
}

exports.like = function(req, res) {
  console.log('eyy');
  models.Uglie.findById(req.params.id).exec(function(err, uglie) {
    uglie.likes++;
    uglie.save();
  });
  res.send('yay!');
}
