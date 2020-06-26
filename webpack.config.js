const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
console.log(process.env.NODE_ENV);
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "chunk.js"
  },
  devServer: {
    port: 8010,
    open: true,
    hot: true,
    contentBase: "./public",
    proxy: {
      "/test": {
        target: "http://localhost:3000",
        secure: false,
        changeOrigin: true
      }
    }
  },
  devtool: "source-map",
  plugins: [
    new htmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      minify: {
        removeComments: true, //移除html中的注释
        collapseWhitespace: true, //删除空白符与换行符
        minifyCSS: true //压缩内联css
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  mode: "development"
};
