let path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  entry: {
    index: './src',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    library: "rkUtil",
    libraryTarget: 'umd'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',
  mode: 'production',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js']
  },
  externals : {
    moment: 'moment',
    querystring: 'querystring',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: { /* Loader options go here */ }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          "babel-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),

  ],
};
