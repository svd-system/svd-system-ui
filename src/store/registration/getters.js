import types from '../types';

export default {
  [types.getters.GET_USER]: (state) => state.user,
  [types.getters.GET_VACCINE]: (state) => state.vaccine,
};
