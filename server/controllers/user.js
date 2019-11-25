const User = require('../models/user');
const { comparePassword } = require('../helpers/hash');
const { signToken } = require('../helpers/jwt');

module.exports = {
  signin (req, res, next) {
    const { request, password } = req.body;
    if(!request || !password) next({status: 400, msg: 'cannot send Empty request/password'})
    else {
      User.findOne({ $or: [{username: request}, {email: request}] })
        .then(user => {
          if(user && comparePassword(password, user.password)) {
            const serverToken = signToken({
              id: user._id,
              email: user.email,
              password: user.password
            })
            res.status(200).json({user, token: serverToken})
          } else {
            next({ status: 400, msg: 'request/password wrong' })
          }
        })
        .catch(next)
    }
  },
  signup (req, res, next) {
    const { username, password, email } = req.body;
    User.create({ username, password, email })
      .then(user => {
        res.status(201).json({user})
      })
      .catch(next)
  }
}