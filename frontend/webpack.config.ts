import * as path from 'path';
import { Configuration } from 'webpack';

const config: Configuration = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, "public"),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
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
    port: 3000
  },
};

export default config;