const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

const htmlPlugin = new HtmlWebPackPlugin({
    template:"./public/index.html",
    filename:"index.html"
});

module.exports = env => ({
    entry: './src/index.js',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '../public'),
        filename: 'bundle.js'
    },
    devServer: {
      historyApiFallback: true,
      port: 8081
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192
              }
            }
          ]
        }
      ]
    },
    plugins: [
        htmlPlugin,
        new webpack.DefinePlugin({[`process.env.API_URL`]: JSON.stringify(`${env.API_URL}`)})
      ]
  });
