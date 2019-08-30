const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  target: 'web',
  mode: 'development',
  entry: {
    index: './www/index.js'
  },
  output: {
    path: path.join(__dirname, 'www-dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@component': path.join(__dirname, 'www', 'components'),
      '@style': path.join(__dirname, 'www', 'style')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './www/index.html',
      chunks: ['index']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  externals: {
    electron: 'commonjs electron',
    react: 'commonjs react',
    'react-dom': 'commonjs react-dom',
    sqlite3: 'commonjs sqllite3'
  }
};
