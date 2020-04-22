import types from '../types';

export default {
  [types.mutations.SET_USER]: (state, user) => {
    state.user = user;
  },
};
