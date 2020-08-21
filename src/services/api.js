import axios from 'axios';

const api = axios.create({
  baseURL: 'https://trz-survivors.herokuapp.com'
});

export default api;