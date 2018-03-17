var path = require('path'),
    webpack = require('webpack');

module.exports = {
  entry: {
    App: "./app/assets/scripts/App.js",
    Vendor: "./app/assets/scripts/Vendor.js"
  },
  output: {
    path: path.resolve(__dirname, "./app/temp/scripts"),
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // expose $ and jQuery to global scope.
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
}

//   module: {
//   	loaders: [
//   		{
//   			loader: 'babel-loader',
//   			query: {
//   				presets: ['es2015']
//   			},
//   			test: /\.js$/,
//   			exclude: /node_modules/
//   		}
//   	]
//   }
// }