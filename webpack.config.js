var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');

/*
 * Default webpack configuration for development
 */
var config = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/src/js/index.js",
  output: {
    path: __dirname + "/build/",
    filename: "bundle.js",
    publicPath: "/build/"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },

  postcss: [
    require('autoprefixer')
  ],

  plugins: [
    new WebpackNotifierPlugin()
  ],

  devServer: {
    colors: true,
    historyApiFallback: true,
    post: process.env.PORT || 8080,
    inline: true
  },
}

module.exports = config;
