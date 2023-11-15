const createConfig = require("./createConfig");
// Try the environment variable, otherwise use root
const ASSET_PATH = process.env.ASSET_PATH || "/";
const SITE_NAME = process.env.SITE;

module.exports = [
  createConfig({
    name: "client",
    optimize: true,
    revision: true,
    extractCss: true,
    stats: true,
    bootstrapChunk: true,
    publicPath: ASSET_PATH,
  }),
  createConfig({
    name: "clientPlus",
    optimize: true,
    revision: true,
    extractCss: true,
    stats: true,
    bootstrapChunk: true,
    publicPath: ASSET_PATH,
  }),
  createConfig({
    name: "server",
    node: true,
    sourceMap: "eval-source-map",
    codeSplitting: false,
    optimize: true,
  }),
];
