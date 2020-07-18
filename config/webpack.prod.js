const base = require("./webpack.base");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { merge } = require("webpack-merge");
module.exports = merge(base, {
  mode: "production",
  devtool: "none",
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
      name: true,
      cacheGroups: {
        commons: {
          chunks: "all",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true,
        }
      }
    },
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        cache: true,
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require("cssnano"),
        cssProcessorPluginOptions: {
          preset: ["default", { discardComments: { removeAll: true } }],
        },
      }),
    ],
  },
});
