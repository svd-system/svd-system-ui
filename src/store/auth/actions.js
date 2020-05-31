import Vue from 'vue';
import types from '../types';

export default {
  [types.actions.STORE_CREDENTIALS]: (state, credentials) => {
    Vue.cookie.set('auth', credentials.auth);
    Vue.cookie.set('token', credentials.token);
    Vue.cookie.set('user', credentials.user);
  },
  [types.actions.CLEAR_CREDENTIALS]: () => {
    Vue.cookie.delete('auth');
    Vue.cookie.delete('token');
    Vue.cookie.delete('user');
  },
  [types.actions.LOAD_AUTHORIZED_USER]: async ({ commit, state }) => {
    const axios = Vue.prototype.$axios;
    if (!state.user) {
      const userApiPath = Vue.cookie.get('user');
      if (userApiPath) {
        await axios
          .get(userApiPath)
          .then((response) => {
            commit(types.mutations.SET_USER, response.data);
            return response.data;
          });
      } else {
        Vue.router.push('/account/login');
      }
    }
  },
};
