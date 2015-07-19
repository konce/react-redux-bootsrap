var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  context: __dirname + '/app',
  entry: {
    app:    './main',
    vendor: [
      'react', 'redux', 'react-redux', 'flux-standard-action',
      'react-router', 'react-router/lib/BrowserHistory',
      'moment', 'superagent', 'bluebird', 'qs', 'url', 'immutable'
    ]
  },
  output: {
    path:     __dirname + '/build',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
  ],
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel?optional[]=runtime&stage=0'}
    ]
  },
  devServer: {
    contentBase: './build'
  }
};
