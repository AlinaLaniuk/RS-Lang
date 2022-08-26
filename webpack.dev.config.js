const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, './dist'),
    },
    hot: false,
  },
  target: 'web',
};
