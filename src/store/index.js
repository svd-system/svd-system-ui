import Vue from 'vue';
import Vuex from 'vuex';

import registration from './registration';
import auth from './auth';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const store = new Vuex.Store({
  modules: {
    registration,
    auth,
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV,
});

export default store;
