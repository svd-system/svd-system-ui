const ddmmyyyy = require('../shared/filters/ddmmyyyy');

export default ({ Vue }) => {
  Vue.filter('ddmmyyyy', ddmmyyyy.format);
};
