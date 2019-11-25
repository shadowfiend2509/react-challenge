const Route = require('express').Router();
const { signin, signup } = require('../controllers/user');

Route.post('/signin', signin)
Route.post('/signup', signup)

module.exports = Route;