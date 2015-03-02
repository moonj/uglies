(function() {
  "use strict";

  var express       = require('express'),
      path          = require('path'),
      conf          = require('nconf').argv().env().file({file: __dirname + '/config.json'}),
      bodyParser    = require('body-parser'),
      sass          = require('node-sass-middleware'),
      hbs           = require('hbs'),
      multer        = require('multer');

  var routes        = require('./routes'); 

  var app = express();
  var port = conf.get('port') || process.env.PORT;

  app.set('port', port);
  app.set('views', path.join(__dirname, 'views'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.set('view engine', 'hbs');
  app.use(sass({
    src: __dirname + '/sass',
    dest: __dirname + '/public',
    debug: true
  }));
  app.use(express.static(path.join(__dirname, 'public')));


  app.use(multer({
    dest: './public/uploads',
    rename: function(fieldname, filename) {
      return filename + Date.now();
    },
    onFileUploadStart: function(file) {
      console.log(file.originalname + " is uploading");
    },
    onFileUploadComplete: function(file) {
      console.log(file.fieldname + " uploaded to " + file.path);
    }})
  );

  app.get('/', routes.index);
  app.post('/upload', routes.upload);
  app.get('/feed', routes.feed);

  var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });
})();
