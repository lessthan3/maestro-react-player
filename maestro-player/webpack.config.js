const { join } = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PORT = 3000
const PRODUCTION = process.env.NODE_ENV === 'production'
const HOST = process.env.HOST || 'localhost'
const PUBLIC_PATH = PRODUCTION ? '' : `http://${HOST}:${PORT}/`

const PATH_DEMO = join(__dirname, 'demo')
const PATH_SRC = join(__dirname, 'src')
const PATH_INDEX = join(__dirname, 'index.html')
const PATH_TESTS = join(__dirname, 'test', 'specs')
module.exports = {
  devtool: 'source-map',
  entry: [
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server',
    './src/demo/index.tsx'
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [ PATH_SRC, PATH_TESTS ]
      },
      {
        include: [ PATH_SRC ],
        test: /\.tsx?$/,
        type: 'javascript/auto',
        use: [
          'babel-loader',
          'ts-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?sourceMap',
          'postcss-loader?sourceMap'
        ],
        include: PATH_SRC
      }
    ]
  },
  output: {
    path: PATH_DEMO,
    filename: 'app.js',
    publicPath: PUBLIC_PATH
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: PATH_INDEX,
      minify: {
        collapseWhitespace: true,
        quoteCharacter: '\''
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.mjs'],
  },
  devServer: {
    disableHostCheck: true,
    host: HOST,
    port: PORT,
    publicPath: PUBLIC_PATH,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  }
}
