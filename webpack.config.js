var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,

  entry: './assets/js/index',
  output: {
    path: path.resolve('./assets/bundles/'),
    publicPath: '/assets/bundles/',
    filename: "bundle.js",
  },

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader',
        query: {presets:['react', 'stage-2'], plugins: ['transform-decorators-legacy']
      }},
      { test: /\.css$/, loader: 'style-loader!css-loader'},
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
    ],
  },

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx']
  },
};
