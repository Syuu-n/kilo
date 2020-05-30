import * as path from 'path';

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
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./public",
    port: 3000,
    host: '0.0.0.0'
  }
};