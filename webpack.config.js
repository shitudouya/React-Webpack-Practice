const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require("path");
const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: ["@babel/polyfill","./src/index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/chunk.[hash:6].js"
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
  devtool: isDev ? "source-map" : "none",
  module: {
    rules: [
      { test: /\.css$/, use: [miniCssExtractPlugin.loader, "css-loader", "postcss-loader"] },
      { test: /\.less$/, use: [miniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"] },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        exclude: /node_modules/,
        use: {
          loader: "url-loader",
          options: {
            name: "images/[name].[hash:6].[ext]"
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
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
    new miniCssExtractPlugin({
      filename: "css/main.[hash:6].css"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }]
      }
    }),
    new CleanWebpackPlugin()
  ]
};
