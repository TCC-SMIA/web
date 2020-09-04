import axios from 'axios';

// const url = process.env.REACT_APP_API_URL;

const api = axios.create({ baseURL: 'https://smia-api.herokuapp.com' });

export default api;
