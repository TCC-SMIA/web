import axios from 'axios';

const api = axios.create({ baseURL: `https://smia-api.herokuapp.com` });

export default api;
