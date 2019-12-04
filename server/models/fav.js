const { model, Schema }= require('mongoose')

const FavSchema = new Schema({
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  HeroId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'heroes'
    }
  ]
})

FavSchema.pre('save', function (next) {
  this.HeroId = []
  next()
})

const Fav = model('favs', FavSchema)

module.exports = Fav;