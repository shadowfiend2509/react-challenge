const Fav= require('../models/fav')

module.exports = {
  addOrRemoveFav (req ,res ,next) {
    const { id } = req.params
    let pass = true
    Fav.findOne({ UserId: req.loggedUser.id })
      .then(fav => {
        if(fav.HeroId.length == 0) {
          return Fav.findOneAndUpdate({ UserId: req.loggedUser.id }, {$push: { HeroId: id }}, { new: true })
        } else {
          fav.HeroId.forEach((el, i) => {
            if(el == id) pass = false
          })
          if(!pass) return Fav.findOneAndUpdate({ UserId: req.loggedUser.id }, {$pull: { HeroId: id }}, {new: true}).populate('HeroId')
          else return Fav.findOneAndUpdate({ UserId: req.loggedUser.id }, {$push: { HeroId: id }}, { new: true }).populate('HeroId')
        }
      })
      .then(fav => {
        if(!pass) res.status(200).json({msg: `Remove from Fav`, fav, pass})
        else res.status(200).json({msg: `Add to Fav`, fav, pass})
      })
      .catch(next)
  },
  getUserFav (req, res, next) {
    Fav.findOne({ UserId: req.loggedUser.id}).populate('HeroId')
      .then(fav => {
        console.log(fav)
        res.status(200).json({fav})
      })
      .catch(next)
  }
}