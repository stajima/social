const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, '../client', 'src', 'main.js'),
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
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
