module.exports = {
  entry: './js/graph.js',
  output: {
    filename: './js/bundle.js'
  },
  devtool: 'source-maps',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
