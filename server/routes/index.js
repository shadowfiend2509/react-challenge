const Route = require('express').Router();
const dotaRoutes = require('./dota');
const heroRoutes = require('./hero');
const userRoutes = require('./user');

Route.use('/', userRoutes);
Route.use('/hero', heroRoutes);
Route.use('/dota', dotaRoutes);

module.exports = Route