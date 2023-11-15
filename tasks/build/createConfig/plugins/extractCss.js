const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ({ revision, extractCss }) => [
  new MiniCssExtractPlugin({
    filename: revision ? "[name].[contenthash].css" : "[name].css",
    chunkFilename: revision ? "[name].[contenthash].css" : "[name].css",
  }),
];
