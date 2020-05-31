// Namespaces
const REGISTRATION = 'registration';
const AUTHORIZATION = 'auth';

// Getters
const GET_USER = 'GET_USER';

// Mutations
const SET_USER = 'SET_USER';

// Actions
const STORE_CREDENTIALS = 'STORE_CREDENTIALS';
const CLEAR_CREDENTIALS = 'CLEAR_CREDENTIALS';
const LOAD_AUTHORIZED_USER = 'LOAD_AUTHORIZED_USER';

const types = {
  namespaces: {
    REGISTRATION,
    AUTHORIZATION,
  },
  getters: {
    GET_USER,
  },
  mutations: {
    SET_USER,
  },
  actions: {
    STORE_CREDENTIALS,
    CLEAR_CREDENTIALS,
    LOAD_AUTHORIZED_USER,
  },
};

export default types;
