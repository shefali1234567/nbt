const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { WEBPACK_DEV_SERVER } = process.env;

module.exports = ({ buildEnv }) =>
  buildEnv && buildEnv == "production" && WEBPACK_DEV_SERVER
    ? [
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportFilename: "report.html",
        }),
      ]
    : [];
