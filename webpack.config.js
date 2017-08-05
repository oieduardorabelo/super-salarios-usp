const path = require("path");

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
      template: joinPath("webpack/html/template.ejs"),
    })
  ]
};
