const Route = require('express').Router();
const msgCont = require('../controllers/msgController');
const { authentication } = require('../middlewares/auth');

Route.get('/', authentication, msgCont.findAllMsg);
Route.post('/', authentication, msgCont.sendMessage);

module.exports = Route;