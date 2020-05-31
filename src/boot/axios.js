import axios from 'axios';

export default ({ Vue }) => {
  const axiosInstance = axios.create({
    baseURL: process.env.API_BASE_PATH_URL,
  });

  axiosInstance.interceptors.request.use((config) => {
    config.headers.authorization = Vue.cookie.get('token');
    return config;
  });

  axiosInstance.interceptors.response.use((response) => response,
    (error) => {
      if (error.response.status === 401) {
        Vue.cookie.delete('auth');
        Vue.cookie.delete('token');
        Vue.cookie.delete('user');
        window.location.reload();
      }
    });

  Vue.prototype.$axios = axiosInstance;
};
