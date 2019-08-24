const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'index': './www/index.js'
  },
  output: {
    path: path.join(__dirname, 'www-dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './www/index.html',
      chunks: ['index']
    })
  ],
  externals: {
    'electron': 'commonjs electron'
  }
};
