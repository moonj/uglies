exports.add = function(req, res) {
  console.log(req.body);
  console.log(req.files);
  res.redirect("/feed");
}

exports.uglie = function(req, res) {
  res.send(req.params.id + ' is awesome');
}

exports.trade = function(req, res) {
}
