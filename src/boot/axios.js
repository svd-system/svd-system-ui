import Vue from 'vue';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_PATH_URL || 'http://localhost:8080',
});

Vue.prototype.$axios = axiosInstance;
