const Hero = require('../models/heroes');

module.exports = {
  createHero (req, res, next) {
    const { localized_name, url_full_portrait, url_small_portrait, url_large_portrait, url_vertical_portrait, id } = req.body
    Hero.create({ name: localized_name, large: url_large_portrait, small: url_small_portrait, full: url_full_portrait, vertical: url_vertical_portrait, id })
      .then(hero => {
        res.status(201).json({hero})
      })
      .catch(next)
  },
  getAllHero (req, res, next) {
    Hero.find()
      .then(heroes => {
        console.log(heroes)
        res.status(200).json({heroes})
      })
      .catch(next)
  },
  findByIdHero (req, res, next) {
    const {id} = req.params;
    Hero.find()
      .then(heroes => {
        if(heroes) {
          let temphero = {};
          heroes.forEach((el, i) => {
            if(el.id == id) {
              temphero = el
            }
          })
          res.status(200).json({hero: temphero})
        } else {
          next({status: 404, msg: 'Hero not Found!'})
        }
      })
      .catch(next)
  }
}