var fs            = require('fs');
exports.users     = require('./users.js');
exports.uglies    = require('./uglies.js');

exports.index = function(req, res) {
  var data = {
    title: "Take an Uglie"
  };
  res.render('index', data);
}

exports.upload = function(req, res) {
  console.log(req.body);
  console.log(req.files);
  res.redirect("/feed");
}

exports.feed = function(req, res) {
  fs.readdir('./public/uploads', function(err, files) {
    if(err) {
      console.log(err);
      res.status(500).end();
    } else {
      var data = {
        title: "Local uglies",
        photos: files
      };
      console.log(files);
      res.render('feed', data);
    }
  });
}
