const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [{
    entry: './src/index.js',
    output: {
      path: __dirname + '/dist',
      filename: 'app.js'
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['react', 'es2015']
              }
            }
          ],
          exclude: /node_modules/,
        }
      ]
    }
  },
  {
    entry: './src/stylesheet/index.sass',
    output: {
      path: __dirname + '/dist',
      filename: 'app.css'
    },
    module: {
      rules: [
        {
          test: /\.sass$/,
          use: ExtractTextPlugin.extract(
            {
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
            }
          )
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("app.css"),
    ]
  }
]

