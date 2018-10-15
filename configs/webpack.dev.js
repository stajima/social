const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, '../client', 'dist'),
    port: 8080,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
