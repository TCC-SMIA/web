import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const api = axios.create({ baseURL: url });

api.interceptors.response.use((response) => {
  if (response.data.status.toString() === '401') {
    localStorage.clear();
    window.location.reload();
  }

  return response;
});

export default api;
