var path = require('path');
var webpack = require('webpack');

var env = 'dev';

var config = {
  entry: [
     path.resolve(__dirname, 'app/Main.js')
   ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    },]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
};

if(env == 'dev'){
  config.entry.concat([
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:3000',
  ])
}


module.exports = config;
