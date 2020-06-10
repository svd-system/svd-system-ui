const ddmmyyyy = require('../shared/filters/ddmmyyyy');
const cpf = require('../shared/filters/cpf');

export default ({ Vue }) => {
  Vue.filter('ddmmyyyy', ddmmyyyy.format);
  Vue.filter('cpf', cpf.format);
};
