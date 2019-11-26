const Route = require('express').Router();
const { addOrRemoveFav } = require('../controllers/fav');
const { authentication } = require('../middlewares/auth');

Route.use(authentication)
Route.patch('/:id', addOrRemoveFav)

module.exports = Route;