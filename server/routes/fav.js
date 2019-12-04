const Router = require('express').Router()

const { addOrRemoveFav, getUserFav }= require('../controllers/fav')
const { authentication } = require('../middlewares/auth')

Router.use(authentication)
Router.get('/', getUserFav)
Router.patch('/:id', addOrRemoveFav)

module.exports = Router