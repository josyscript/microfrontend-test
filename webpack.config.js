const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const { dependencies } = require("./package.json");

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3001,
  },
  
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "Remote",
      filename: "moduleEntry.js",
      exposes: {
        "./App": "./src/App",
        "./Button": "./src/Button",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: './public/favicon.ico',
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    
  },
  target: "web",
};