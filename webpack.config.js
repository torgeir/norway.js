const webpack = require('webpack');

module.exports = {
  context: __dirname + '/src', // `__dirname` is root of project and `src` is source
  entry: {
    example: '../example/example.js',
    norway: './norway.js'
  },
  output: {
    path: __dirname + '/dist', // `dist` is the destination
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }]
      }
    ]
  }
};
