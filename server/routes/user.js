const  Route = require('express').Router();
const { signin, signup, signInUser, signInGoogle }= require('../controllers/user');
const { authentication }= require('../middlewares/auth');

Route.post('/signin', signin)
Route.post('/signup', signup)
Route.post('signingoogle', signInGoogle)
Route.get('/',authentication, signInUser)

module.exports = Route;