import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

console.log(url);

const api = axios.create({ baseURL: url });

export default api;
