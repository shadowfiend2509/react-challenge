const Route = require('express').Router()
const dotaRoutes= require('./dota')
const heroRoutes= require('./hero')
const userRoutes= require('./user')
const favRoutes= require('./fav')
const msgRoutes= require('./msg')

Route.use('/', userRoutes);
Route.use('/hero', heroRoutes);
Route.use('/dota', dotaRoutes);
Route.use('/fav', favRoutes);
Route.use('/msg', msgRoutes);

module.exports = Route;