import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://serverdoto.dreamcarofficial.com'
})

export default instance