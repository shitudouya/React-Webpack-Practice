const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCSSExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const friendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const lodashWebpackPlugin = require("lodash-webpack-plugin");
module.exports = {
  entry: path.resolve(__dirname, "../src"),
  output: {
    filename: "js/[name].[hash:6].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".less", ".css"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, include: path.resolve(__dirname, "../src"), use: "eslint-loader", enforce: "pre" },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, "../src"),
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["lodash"],
            presets: ["@babel/preset-env"],
          },
        },
      },
      { test: /\.css$/, use: [miniCSSExtractPlugin.loader, "css-loader", "postcss-loader"] },
      { test: /\.less$/, use: [miniCSSExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"] },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        use: {
          loader: "url-loader",
          options: {
            esModule: false,
            limit: 10 * 1024,
            name: "[name]_[hash:4].[ext]",
            outputPath: "video",
            publicPath: "/video",
          },
        },
      },
      { test: /\.(html|htm)$/, loader: "html-withimg-loader" },
      {
        test: /\.(jpg|png|jpeg|gif|svg|bmp)$/,
        use: {
          loader: "url-loader",
          options: {
            esModule: false,
            limit: 10 * 1024,
            name: "[name]_[hash:6].[ext]",
            outputPath: "images",
            publicPath: "/images",
          },
        },
      },
      {
        test: /\.(ttf|eot|woff|woff2|otf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              esModule: false,
              name: "[name]_[hash:6].[ext]",
              limit: 10 * 1024,
              outputPath: "fonts",
              publicPath: "/fonts",
            },
          },
        ],
      },
    ],
  },
  stats: "minimal",
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        minifyCSS: true,
      },
      hash: true,
    }),
    new miniCSSExtractPlugin({
      filename: "css/[name]_[hash:6].css",
      chunkFilename: "css/[id].css",
    }),
    new lodashWebpackPlugin({
      collections: true,
      paths: true,
    }),
    new friendlyErrorsWebpackPlugin(),
    new CleanWebpackPlugin(),
  ],
};
