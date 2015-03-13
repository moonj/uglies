var fs            = require('fs');
exports.users     = require('./users.js');
exports.uglies    = require('./uglies.js');
var models        = require('../models');

//newsfeed
exports.index = function(req, res) {
  var result = models.Uglie.find({}).sort({_id:1}).limit(10).populate('_owner _creator', 'username').exec(function(err, result) {
    var data = {
      feedItems: result
    };
    console.log(result);
    res.render('feed', data);
  });
}

//your own profile
exports.profile = function(req, res) {
  var id = req.user.id;
  res.redirect('/user/' + id);
}

exports.upload = function(req, res) {
  console.log(req.body);
  console.log(req.files);
  res.redirect("/feed");
}
