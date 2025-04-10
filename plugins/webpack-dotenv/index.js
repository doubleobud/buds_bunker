const Dotenv = require('dotenv-webpack');

module.exports = function (context, options) {
  return {
    name: 'custom-webpack-dotenv',
    configureWebpack() {
      return {
        plugins: [new Dotenv()],
      };
    },
  };
};
