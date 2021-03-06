const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: { main: "./src/index", app2: "./src/setPublicPath.js" },
  mode: "development",
  target:["web","es5"],
  devServer: {
    proxy: {
      "/static": {
        target: "http://localhost:3002",
        pathRewrite: { "^/static": "" }
      }
    },
    contentBase: path.join(__dirname, "dist"),
    port: 3002
  },
  output: {
    publicPath: "/static/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        }
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
      library: { type: "var", name: "app2" },
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/Button",
        "./setPublicPath":'./src/setPublicPath.js'
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
