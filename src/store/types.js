// Namespaces
const REGISTRATION = 'registration';
const AUTHORIZATION = 'auth';

// Getters
const GET_USER = `${REGISTRATION}/GET_USER`;

// Mutations
const SET_USER = `${REGISTRATION}/SET_USER`;

// Actions
const STORE_CREDENTIALS = 'STORE_CREDENTIALS';

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
  },
};

export default types;
