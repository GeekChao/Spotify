const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
    template:"./public/index.html",
    filename:"index.html"
});

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    },
    devServer: {
      historyApiFallback: true
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
    plugins: [htmlPlugin]
  };
