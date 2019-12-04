const { model, Schema }= require('mongoose')

const FavSchema = new Schema({
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  HeroId: []
})

FavSchema.pre('save', function (next) {
  this.HeroId = []
  next()
})

const Fav = model('favs', FavSchema)

module.exports = Fav;