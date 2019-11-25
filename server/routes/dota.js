const Route = require('express').Router();
const { getLive, getAccountId } = require('../controllers/dota');

Route.get('/live', getLive);
Route.get('/acc/:id', getAccountId);


module.exports = Route;