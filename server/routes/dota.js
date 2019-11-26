const Route = require('express').Router();
const { 
  getLive, 
  getAccountId, 
  getHeroStats, 
  getRadiantWinRate, 
  getDireWinRate,
  getByRoleHeroes,
  getAllRole
} = require('../controllers/dota');

Route.get('/live', getLive);
Route.get('/:id', getHeroStats)
Route.get('/acc/:id', getAccountId);
Route.get('/radiant/:id', getRadiantWinRate);
Route.get('/dire/:id', getDireWinRate);
Route.get('/role/all', getAllRole);
Route.get('/role/:role', getByRoleHeroes);

module.exports = Route;