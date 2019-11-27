const Route = require('express').Router();
const { addOrRemoveFav, getUserFav } = require('../controllers/fav');
const { authentication } = require('../middlewares/auth');

Route.use(authentication)
Route.get('/', getUserFav)
Route.patch('/:id', addOrRemoveFav)

module.exports = Route;