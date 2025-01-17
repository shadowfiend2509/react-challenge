const { model, Schema }= require('mongoose');
const { hashPassword }= require('../helpers/hash');

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username is required']
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true
  },
  role: String
})

UserSchema.pre('save', function (next) {
  this.password = hashPassword (this.password)
  this.role = 'annon';
  next()
})

UserSchema.path('email').validate(function (val) {
  return User.findOne({ email: val })
    .then(user => {
      if(user) return false;
    })
}, 'Email allready used!')

const User = model('users', UserSchema)

module.exports = User;