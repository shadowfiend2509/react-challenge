const Route = require('express').Router();
const { getLive, getAccountId, getHeroStats } = require('../controllers/dota');

Route.get('/live', getLive);
Route.get('/:id', getHeroStats)
Route.get('/acc/:id', getAccountId);


module.exports = Route;