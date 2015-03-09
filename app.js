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
      session       = require('express-session');

  var routes        = require('./routes'); 

  var SALT_WORK_FACTOR = 10;


  var app = express();
  var port = process.env.PORT || conf.get('port');

  var local_db = conf.get('db') || 'db',
      local_db_uri =  'mongodb://localhost:' + 27017 + '/' + local_db,
      db_uri = process.env.MONGOLAB_URI || local_db_uri,
      secret = conf.get('secret') || 'fatbay';
  mongoose.connect(db_uri);
  var db = mongoose.connection;
  db.once('open', function() {
    console.log('connected to db');
  });

  var userSchema  = mongoose.Schema({
    username: { type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
  });

  userSchema.pre('save', function(next) {
    var user = this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if(err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
      });
    });
  });

  userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if(err) return cb(err);
      cb(null, isMatch);
    });
  };

  var User = mongoose.model('User', userSchema);
  var user = new User({ username: 'jay', email: 'jaymoon@stanford.edu', password: 'eh'});
  user.save(function(err) {
    if(err) console.log(err);
    else console.log('user: ' + user.username + ' saved.');
  });

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({username: username}, function(err, user) {
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

  app.get('/', routes.index);
  app.post('/add', routes.uglies.add);
  app.get('/feed', routes.feed);
  app.get('/uglie/:id', routes.uglies.uglie);

  // RUN SERVER

  var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
  });
})();
