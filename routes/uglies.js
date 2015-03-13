var models = require('../models'),
    mongoose = require('mongoose');

exports.add = function(req, res) {
  res.render('add');
}

exports.postAdd = function(req, res) {
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
  res.redirect("/user/" + req.user.id);
}

exports.uglie = function(req, res) {
  models.Uglie.findById(req.params.id).populate('_owner').exec(function(err, uglie) {
    if(err) res.redirect('/');
    var itsYou = req.user.id == uglie._owner.id;
      var liked = false;
      for(var i =0; i < uglie.likes.length; i++) {
        if(uglie.likes[i] == req.user.id) liked = true;
      }
    var data = {
      uglie: uglie,
      itsYou: itsYou,
      liked: liked
    }
    res.render('uglie', data)
  });
}

exports.trade = function(req, res) {
  models.Uglie.findById(req.params.id).populate('_owner').exec(function(err, uglie) {
    models.Uglie.find({_owner:req.user.id}).exec(function(err, yourUglies) {
    if(err) res.redirect('/');
    var data = {
      uglie: uglie,
      yourUglies: yourUglies
    }
    res.render('trade', data);
    });
  });
}

exports.postTrade = function(req, res) {
  var request = new models.Request({
    _requester: req.user.id,
    _requestee: req.body.requestee,
    _requested_uglie: req.body.id,
    _offer: req.body.offer
  });
  request.save();
  var response = {
    status: 200,
    success: 'yay'
  }
  res.end(JSON.stringify(response));
}

exports.deleteUglie = function(req, res) {
  models.Uglie.findById(req.params.id).remove().exec();
  res.send('hey there!');
}

exports.like = function(req, res) {
  models.Uglie.findById(req.params.id).exec(function(err, uglie) {
    for(var i = 0; i < uglie.likes.length; i++) {
      if(uglie.likes[i] == req.user.id) {
        uglie.likes.splice(i, 1)
        uglie.save();
        res.end();
        return;
      }
    }
    uglie.likes.push(req.user.id);
    uglie.save();
  });
  res.end();
}

exports.request = function(req, res) {
  models.Request.findById(req.params.id).populate('_requester _requested_uglie _offer').exec(function(err, request) {
    var data = {
      request: request
    };
    res.render('request', data);
  });
}

exports.postRequest = function(req, res) {
  models.Request.findById(req.params.id).populate('_requested_uglie _offer').exec(function(err, request) {
    if(req.body.response == 'accept') {
      var newOwner = request._requester;
      var oldOwner = request._requestee;
      request._requested_uglie._owner = newOwner;
      for(var i = 0; i < request._offer.length; i++) {
        request._offer[i]._owner = oldOwner;
        request._offer[i].save()
      }
      request._requested_uglie.save(function() {
        request.remove();
      });
    } else if (req.body.response == 'decline') 
        request.remove();
  })
  var data = {
    response: 'yay'
  };
  res.end(JSON.stringify(data));
}
