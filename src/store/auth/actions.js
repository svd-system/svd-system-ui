import Vue from 'vue';
import types from '../types';

export default {
  [types.actions.STORE_CREDENTIALS]: (state, credentials) => {
    Vue.cookie.set('auth', credentials.auth);
    Vue.cookie.set('token', credentials.token);
  },
};
