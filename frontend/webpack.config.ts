// import * as path from 'path';
const path = require('path');

module.exports = {
  entry: [path.resolve(__dirname, "src/index.tsx")],
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css?$/,
        use:['style-loader','css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: 'file-loader'
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  devtool: "source-map",
  devServer: {
    contentBase: "./public",
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true
  }
};