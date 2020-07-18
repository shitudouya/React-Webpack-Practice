const base = require("./webpack.base");
const path = require("path");
const { merge } = require("webpack-merge");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const smp = new SpeedMeasurePlugin();
module.exports = smp.wrap(
  merge(base, {
    mode: "development",
    devtool: "source-map",
    optimization: {
      minimize: false,
    },
    devServer: {
      port: 8010,
      open: true,
      progress: true,
      contentBase: path.resolve(__dirname, "../dist"),
      proxy: {
        "/api": {
          target: "http://localhost:8079",
          changeOrigin: true,
        },
      },
    },
    plugins: [new BundleAnalyzerPlugin()],
  })
);
