(function() { "use strict"; 
  var express       = require('express'),
      path          = require('path'),
      conf          = require('nconf').argv().env().file({file: __dirname + '/config.json'}),
      bodyParser    = require('body-parser'),
      sass          = require('node-sass-middleware'),
      hbs           = require('hbs'),
      multer        = require('multer'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      mongodb       = require('mongodb'),
      mongoose      = require('mongoose'),
      bcrypt        = require('bcrypt'),
      session       = require('express-session'),
      models        = require('./models');

  var routes        = require('./routes'); 

  var app = express();
  var port = process.env.PORT || conf.get('port');

  var local_db = conf.get('db') || 'uglies',
      local_db_uri =  'mongodb://localhost:' + 27017 + '/' + local_db,
      db_uri = process.env.MONGOLAB_URI || local_db_uri,
      secret = conf.get('secret') || 'fatbay';
  mongoose.connect(db_uri);
  var db = mongoose.connection;
  db.once('open', function() {
    console.log('connected to db');
  });

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    models.User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      models.User.findOne({username: username}, function(err, user) {
        if(err) return done(err);
        if(!user) return done(null, false, {message: 'Unknown user ' + username});
        user.comparePassword(password, function(err, isMatch) {
          if(err) return done(err);
          if(isMatch) return done(null, user);
          else return done(null, false, {message: 'Invalid password.'});
        });
      });
    })
  );

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
  app.use(session({secret: 'fatbay', saveUninitialized: false, resave: false}));
  app.use(passport.initialize());
  app.use(passport.session());
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

  // ROUTES

  var isAuthenticated = function(req, res, next) {
    if(req.isAuthenticated()) return next();
    console.log('redirecting...');
    res.redirect('/login');
  }

  app.get('/', isAuthenticated, routes.index);

  app.get('/login', routes.users.login);
  app.post('/login', passport.authenticate(
    'local', {failureRedirect: '/login'}), routes.users.postLogin);
  app.get('/signup', routes.users.signup);
  app.post('/signup', routes.users.postSignup);
  app.get('/logout', routes.users.logout);

  app.get('/feed', isAuthenticated, routes.feed);
  app.get('/uglie/add', isAuthenticated, routes.uglies.add);
  app.post('/uglie/add', isAuthenticated, routes.uglies.postAdd);
  app.get('/uglie/:id', isAuthenticated, routes.uglies.uglie);
  app.delete('/uglie/:id', routes.uglies.deleteUglie);
  app.post('/uglie/:id/like', routes.uglies.like);
  
  app.get('/user/:id', routes.users.user);
  app.get('/friends', routes.users.friends);

  // RUN SERVER

  app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });
})();
