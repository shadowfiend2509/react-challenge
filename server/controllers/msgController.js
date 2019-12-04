const Msg = require('../models/message');

module.exports = {
  findAllMsg (req, res, next) {
    Msg.find().populate('UserId')
      .then(messages => {
        res.status(200).json({msg: messages})
      })
      .catch(next)
  },
  sendMessage (req, res, next) {
    const UserId = req.loggedUser.id;
    const msg = req.body.msg;
    Msg.create({ msg, UserId })
      .then(msg => {
        return Msg.findById({ _id: msg._id }).populate('UserId')
      })
      .then(msg => {
        res.status(200).json({msg})        
      })
      .catch(next)
  }
}