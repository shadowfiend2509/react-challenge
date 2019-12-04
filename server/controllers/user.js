const User= require('../models/user')
const { comparePassword }= require('../helpers/hash')
const Fav= require('../models/fav')
const { signToken }= require('../helpers/jwt')
const { OAuth2Client }= require('google-auth-library')

module.exports = {
  signin (req, res, next) {
    const { request, password } = req.body;
    if(!request || !password) next({status: 400, msg: 'cannot send Empty request/password'})
    else {
      User.findOne({ $or: [{username: request}, {email: request}] })
        .then(user => {
          if(user && comparePassword(password, user.password)) {
            console.log(req.body)
            const serverToken = signToken({
              id: user._id,
              email: user.email,
              password: user.password
            })
            console.log(serverToken)
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
    let tempUser
    User.create({ username, password, email })
      .then(user => {
        tempUser = user
        return Fav.create({ UserId: user._id })
      })
      .then(() => {
        res.status(201).json({user: tempUser})
      })
      .catch(next)
  },
  signInUser (req, res, next) {
    User.findById(req.loggedUser.id)
      .then(user => {
        res.status(200).json({user})
      })
      .catch(next)
  },
  signInGoogle (req, res, next) {
    const client = new OAuth2Client('917355642899-pqjp8dcnrrr7237hqmdeu1rf549piu65.apps.googleusercontent.com');
    let username,
      email
    client.verifyIdToken({
      idToken: id_token,
      audience: '917355642899-pqjp8dcnrrr7237hqmdeu1rf549piu65.apps.googleusercontent.com'
    })
      .then(ticket => {
        const payload = ticket.getPayload()
        console.log(payload)
      })
    // const { email, username } = req.body;
    // console.log(req.body)
    // User.findOne({ email })
    //   .then(user => {
    //     console.log('dapat user', user)
    //     if(user) {
    //       return user
    //     } else {
    //       let tempPass = ''
    //       for(let i=0; i<5; i++){
    //         let alfa = 'fafniefpqmfkpeda';
    //         let rand = Math.floor(Math.random() * alfa.length)
    //         tempPass += alfa[rand]
    //       }
    //       return User.create({ username, email, password: tempPass })
    //     }
    //   })
    //   .then(user => {
    //     const payload = {
    //       id: user.id,
    //       email: user.email,
    //       username: user.username
    //     }
    //     const serverToken = signToken(payload)
    //     res.status(200).json({token: serverToken})
    //   })
    //   .catch(next)
  }
}