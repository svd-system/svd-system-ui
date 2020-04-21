import Vue from 'vue';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://svd-system-api-feature.herokuapp.com',
});

Vue.prototype.$axios = axiosInstance;
