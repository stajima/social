const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, '../client', 'src', 'app.js'),
  output: {
    path: path.join(__dirname, '../client', 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
