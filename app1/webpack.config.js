const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExternalTemplateRemotesPlugin = require('./ExternalTemplateRemotesPlugin');
const path = require("path");

module.exports = {
  entry: { main:["@babel/polyfill","./src/index.js"]},
  mode: "development",
  target:["web","es5"],
  experiments: {
    topLevelAwait: true
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3001
  },
  output: {
    publicPath: "auto"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env","@babel/preset-react"],
          plugins: ["@babel/plugin-syntax-top-level-await"]
        }
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app1",
      remotes:{
        "app2":"app2@[window.app2Url]/remoteEntry.js"
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } }
    }),

    new ExternalTemplateRemotesPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
