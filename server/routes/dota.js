const Route = require('express').Router()

// const Route = require('express').Route();
const { 
  getLive, 
  getAccountId, 
  getHeroStats, 
  getRadiantWinRate, 
  getDireWinRate,
  getByRoleHeroes,
  getAllRole,
  getTeamDota,
  findOneTeam
}= require('../controllers/dota' )
const { authentication }= require('../middlewares/auth')

Route.get('/live', getLive);
Route.get('/team', getTeamDota);
Route.get('/:id', getHeroStats)
Route.get('/acc/:id', getAccountId);
Route.get('/radiant/:id', getRadiantWinRate);
Route.get('/dire/:id', getDireWinRate);
Route.get('/role/all', getAllRole);
Route.get('/role/:role', getByRoleHeroes);

Route.get('/team/:name',authentication, findOneTeam);

module.exports = Route;