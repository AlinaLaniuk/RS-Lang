const EslintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'production',
    plugins: [new EslintPlugin({ extensions: 'ts' })],
};
