const path = require("path");
const webpack = require("webpack");

const PluginWebpackClean = require("clean-webpack-plugin");
const PluginWebpackCopy = require("copy-webpack-plugin");
const PluginWebpackHtml = require("html-webpack-plugin");

const joinPath = str => path.resolve(__dirname, str);

module.exports = {
  entry: joinPath("client/entry"),
  output: {
    filename: "[name].bundle.js",
    path: joinPath("dist"),
    pathinfo: true,
    publicPath: "/"
  },
  module: {
    loaders: [
      {
        exclude: [/node_modules/],
        test: /\.js$/,
        use: "babel-loader"
      },
      {
        exclude: [/node_modules/],
        test: /\.(jpg|png)$/,
        use: "url-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new PluginWebpackHtml({
      template: joinPath("webpack/html/template.ejs")
    }),

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),

    new PluginWebpackClean(joinPath("dist")),

    new PluginWebpackCopy([
      {
        from: "server/usp-salarios.json",
        to: "server/usp-salarios.json"
      }
    ]),

    new webpack.optimize.UglifyJsPlugin()
  ]
};
