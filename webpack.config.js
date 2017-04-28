var webpack = require('webpack');
var path = require('path');
var BowerResolvePlugin = require("bower-resolve-webpack-plugin");
//var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname + '/client',
  entry: {
    app: './map.js',
    vendor: [
      'angular',
      'angular-route',
      'angular-sanitize',
      'angular-animate',
      'jquery',
      'bootstrap',
      'skycons',
      'moment',
      'moment-timezone'
    ]
  },
  output: {
    filename: 'script.bundle.js',
    path: __dirname + '/public/scripts'
  },
  resolve: {
    plugins: [new BowerResolvePlugin()],
    modules: ['bower_components', 'node_modules'],
    alias: {
     skycons$: path.resolve(__dirname, './bower_components/skycons/skycons.js')
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
  ]


}

/*{
      skycons$: 'bower_components/angular-skycons/angular-skycons-min.js'
    }*/