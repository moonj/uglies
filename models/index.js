var bcrypt        = require('bcrypt'),
    mongoose      = require('mongoose');

var SALT_WORK_FACTOR = 10;

var userSchema  = mongoose.Schema({
  username: { type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: false, sparse: true}
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

var uglieSchema = mongoose.Schema({
  _creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  _owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: {type: String},
  likes: {type: [mongoose.Schema.Types.ObjectId]},
  path: {type: String}
});

var Uglie = mongoose.model('Uglie', uglieSchema);

exports.userSchema = userSchema;
exports.User = User;

exports.uglieSchema = uglieSchema;
exports.Uglie = Uglie;
