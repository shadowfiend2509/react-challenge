const Route = require('express').Router();
const { createHero, getAllHero, findByIdHero } = require('../controllers/hero');

Route.get('/', getAllHero)
Route.get('/:id', findByIdHero)


Route.post('/', createHero)

module.exports = Route;