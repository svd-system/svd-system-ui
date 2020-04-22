const DotEnv = require('dotenv');

const parsedEnv = DotEnv.config().parsed;

module.exports = () => {
  Object.keys(parsedEnv).forEach((key) => {
    if (typeof parsedEnv[key] === 'string') {
      parsedEnv[key] = JSON.stringify(parsedEnv[key]);
    }
  });

  return parsedEnv;
};
