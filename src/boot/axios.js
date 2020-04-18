import Vue from 'vue';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:8080/',
});

Vue.prototype.$axios = axiosInstance;
