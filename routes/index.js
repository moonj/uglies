var fs            = require('fs');
exports.users     = require('./users.js');
exports.uglies    = require('./uglies.js');
var models        = require('../models');

//newsfeed
exports.index = function(req, res) {
  var result = models.Uglie.find({}).sort({_id:1}).limit(10).populate('_owner _creator', 'username').exec(function(err, feed) {
    models.Request.find({
      _requestee: req.user.id
    }).populate('_requester').exec(function(err, requests) { 
      var pendingRequests = false;
      if(requests.length >0) {
        pendingRequests = true;
      }
      var data = {
        feedItems: feed,
        pendingRequests: pendingRequests,
        requests: requests
      };
      res.render('feed', data);
    });
  });
}

//your own profile
exports.profile = function(req, res) {
  var id = req.user.id;
  res.redirect('/user/' + id);
}
