import path from 'path'
import { join } from 'path'
import { extract } from 'extract-text-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config, { minifyPlugins } from './webpack.demo.babel'

const VIDEOJS_VAST = join(__dirname, 'node_modules', 'maestro-videojs-vast', 'dist')

export default {
  ...config,
  entry: './src/ReactPlayer',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'ReactPlayer.js',
    library: 'ReactPlayer'
  },
  externals: {
    'react': 'React'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          plugins: ['add-module-exports']
        }
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        use: [
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: minifyPlugins
}

function styleLoader (loaders) {
  if (process.env.NODE_ENV === 'production') {
    const [ fallback, ...use ] = loaders
    return extract({ fallback, use })
  }
  return loaders
}
