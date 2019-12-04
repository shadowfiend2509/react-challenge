const { decodeToken } = require('../helpers/jwt');
const User = require('../models/user');

module.exports = {
  authentication (req, res, next) {
    try{
      if(req.headers.token) {
        const decode = decodeToken(req.headers.token)
        req.loggedUser = decode;
        next()
      } else {
        next({ status: 403, msg: 'Authentication Error' })
      }
    }
    catch(err){
      next(err)
    }
  },

  authorCRUDHeroes (req, res, next) {
    try{
      User.findById(req.loggedUser.id)
        .then(user => {
          if(user.role == 'created' && username == 'sudhartioeric') {
            next()
          } else {
            next({ status: 403, msg: 'Authorization Error' })
          }
        })
        .catch(next)
    }
    catch(err) {
      next(err)
    }
  },
}