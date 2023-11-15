const createConfig = require("./createConfig");
const SITE_PATH = process.env.SITE_PATH || "";

module.exports = [
  createConfig({
    name: "client",
    sourceMap: "eval-source-map",
    hot: false,
    bootstrapChunk: true,
    codeSplitting: true,
    // TODO: Remove the need for `publicPath` once the style / css loader
    // has landed a better fix for relative image references from
    // sourcemapped css.
    // https://github.com/webpack/style-loader#recommended-configuration
    // https://github.com/webpack/style-loader/issues/55
    publicPath: `/${SITE_PATH}`,
  }),
  // createConfig({
  //   name: "clientPlus",
  //   sourceMap: "eval-source-map",
  //   hot: false,
  //   bootstrapChunk: true,
  //   // TODO: Remove the need for `publicPath` once the style / css loader
  //   // has landed a better fix for relative image references from
  //   // sourcemapped css.
  //   // https://github.com/webpack/style-loader#recommended-configuration
  //   // https://github.com/webpack/style-loader/issues/55
  //   publicPath: `/${SITE_PATH}`,
  // }),
  createConfig({
    name: "server",
    node: true,
    sourceMap: "eval-source-map",
    codeSplitting: false,
  }),
];
