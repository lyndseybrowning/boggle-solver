var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');
var HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * Default webpack configuration for development
 */
var config = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/src/js/index.js",
  output: {
    path: __dirname,
    filename: "bundle.js",
    publicPath: "/"
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
    new WebpackNotifierPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/templates/index.template.ejs',
      inject: 'body'
    })
  ],

  devServer: {
    colors: true,
    historyApiFallback: true,
    post: process.env.PORT || 8080,
    inline: true
  }
}

module.exports = config;
