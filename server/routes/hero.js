const Route = require('express').Router()
const { createHero, getAllHero, findByIdHero, getByName }= require('../controllers/hero')
const { authentication, authorCRUDHeroes }= require('../middlewares/auth')

Route.get('/', getAllHero)
Route.get('/:id', findByIdHero)
Route.get('/name/:name', getByName)


Route.post('/', authentication, authorCRUDHeroes, createHero)

module.exports = Route;