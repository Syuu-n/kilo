// import * as path from 'path';
const path = require('path');

module.exports = {
  entry: [path.resolve(__dirname, "./src/index.tsx")],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: 'bundle.js'
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
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false }
          }
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./public",
    port: 3000,
    host: '0.0.0.0'
  }
};