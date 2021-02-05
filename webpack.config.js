const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: 'bundle.js',
    publicPath: './'
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 8080,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|tiff|ico)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: './.env',
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['main'],
      favicon: './public/favicon.ico'
    })
  ]
}
