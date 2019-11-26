const Fav = require('../models/fav');

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
          if(!pass) return Fav.findOneAndUpdate({ UserId: req.loggedUser.id }, {$pull: { HeroId: id }}, {new: true})
          else return Fav.findOneAndUpdate({ UserId: req.loggedUser.id }, {$push: { HeroId: id }}, { new: true })
        }
      })
      .then(fav => {
        if(!pass) res.status(200).json({msg: `Hero with id ${id} removed!`, fav})
        else res.status(200).json({msg: `Hero with id ${id} added!`, fav})
      })
      .catch(next)
  }
}