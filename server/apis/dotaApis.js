const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://api.opendota.com/api'
})

module.exports = instance;