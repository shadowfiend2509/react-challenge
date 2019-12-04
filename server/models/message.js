const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const MsgSchema = new Schema({ 
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  msg: {
    type: String,
    required: [true, 'need message']
  },
  createdAt: Date
})

MsgSchema.pre('save', function (next) {
  this.createdAt = new Date()
  next()
})

const Msg = Mongoose.model('messages', MsgSchema);


module.exports = Msg;