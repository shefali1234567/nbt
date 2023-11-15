const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const javascript = require("./rules/javascript");
const { css, cssModules } = require("./rules/css");
const fonts = require("./rules/fonts");
const images = require("./rules/images");
const video = require("./rules/video");
const audio = require("./rules/audio");
const extractCss = require("./plugins/extractCss");
// const copyCss = require('./plugins/copyCss');
const optimize = require("./plugins/optimize");
const stats = require("./plugins/stats");
const hmr = require("./plugins/hmr");
const codeSplitting = require("./plugins/codeSplitting");
const bootstrapChunk = require("./plugins/bootstrapChunk");
const workbox = require("./plugins/workbox");
const bundleAnalyzer = require("./plugins/bundleAnalyzer");
const brotliGzipPlugin = require("./plugins/brotliGzipPlugin");
// const createSvg = require("./plugins/createSvg");
const svg = require("./rules/svg");
const bundleSizeCheck = require("./plugins/bundleSizeCheck");

const SITE_NAME = process.env.SITE;
const SRC_DIR = path.join(__dirname, "../../../src");
// console.log("SANDEEP",SRC_DIR);
const DIST_DIR = path.join(__dirname, "../../../dist");

const DEFAULTS = {
  name: "",
  revision: false,
  node: false,
  sourceMap: false,
  hot: false,
  optimize: false,
  extractCss: false,
  copyCss: true,
  stats: false,
  codeSplitting: true,
  bootstrapChunk: false,
  workbox: true,
  publicPath: "",
  buildEnv: process.env.NODE_ENV,
};

/**
 * Creates a Webpack config.
 * @param {string}          options.name           Name of the bundle (and entry point relative to the src dir).
 * @param {boolean}         options.revision       Revision assets for long term caching.
 * @param {boolean}         options.node           Output bundle ready to run in node.
 * @param {string}          options.sourceMap      Output sourcemaps, specifying which devtool to use.
 * @param {boolean}         options.hot            Use HMR.
 * @param {boolean}         options.optimize       Optimize output for release.
 * @param {boolean}         options.extractCss     Extract CSS into external file.
 * @param {boolean}         options.copyCss        copy CSS into external file.
 * @param {boolean}         options.stats          Output build stats.
 * @param {boolean}         options.codeSplitting  Disable split points by limiting max chunks to 1.
 * @param {boolean}         options.bootstrapChunk Pull Webpack bootstrap code into own chunk.
 * @param {boolean}         options.workbox        Enable servive worker using workbox
 * @param {string}          options.publicPath     The public path.
 */
module.exports = options => {
  options = Object.assign({}, DEFAULTS, options);

  const { name, revision, node, publicPath, sourceMap, hot } = options;
  let entryPointName = name;

  // For development builds , only one entry point is there for client. client / clientPlus
  if (process.env.NODE_ENV === "development") {
    entryPointName = name === "client" && process.env.PLUS === "true" ? "clientPlus" : name;
  }
  const ASSET_PATH = process.env.ASSET_PATH || "/";

  let mode = "production";
  if (process.env.NODE_ENV === "development") {
    mode = "development";
  }
  const isStagingEnv = process.env.NODE_ENV.includes("stg");
  const config = {
    name,
    context: SRC_DIR,
    mode,
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all",
          },
          default: false,
        },
      },
      concatenateModules: false,
      moduleIds: "named",
      chunkIds: "named",
    },
    entry: {
      [name]: hot
        ? [
            // "babel-polyfill",
            "react-hot-loader/patch",
            `webpack-hot-middleware/client`,
            `./${
              process.env.PLATFORM === "desktop" && (name === "client" || name === "clientPlus")
                ? `desktop/${entryPointName}` // FIXME: Need to add entryPoint of client for desktop
                : `${entryPointName}`
            }`,
          ]
        : [
            // "babel-polyfill",
            `./${
              process.env.PLATFORM === "desktop" && (name === "client" || name === "clientPlus")
                ? `desktop/${entryPointName}` // FIXME: Need to add entryPoint of client for desktop
                : `${entryPointName}`
            }`,
          ],
    },
    output: {
      library: revision ? "[name].[chunkhash]" : "[name]",
      path: DIST_DIR,
      chunkFilename: revision ? "[name].[chunkhash].js" : "[name].js",
      filename: revision ? "[name].[chunkhash].js" : "[name].js",
      libraryTarget: "umd",
      umdNamedDefine: false,
      publicPath,
    },
    module: {
      rules: [
        javascript(SRC_DIR),
        css(/node_modules/, options),
        cssModules(SRC_DIR, options),
        fonts(SRC_DIR),
        images(SRC_DIR),
        video(SRC_DIR),
        audio(SRC_DIR),
        svg(SRC_DIR),
      ],
    },
    resolve: {
      modules: [SRC_DIR, "node_modules"],
      preferRelative: true,
      fallback: {
        process: false,
        fs: false,
        __dirname: false,
        util: false,
        tls: false,
        url: false,
        assert: false,
        os: false,
        buffer: false,
        path: false,
        http: false,
        https: false,
        stream: false,
      },
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new ProgressBarPlugin(),
      // ...copyCss(options),
      // This makes it possible for us to safely use env vars on our code
      new webpack.DefinePlugin({
        "process.env.ASSET_PATH": JSON.stringify(ASSET_PATH),
      }),
      ...extractCss(options),
      ...stats(options),
      ...hmr(options),
      ...codeSplitting(options),
      ...bundleSizeCheck(SITE_NAME, name, process.env.PLATFORM, isStagingEnv),
      // ...bootstrapChunk(options),
      // ...brotliGzipPlugin(options),
      ...workbox(options),
      ...bundleAnalyzer(options),
      // ...createSvg(),
    ],
    devtool: sourceMap || false,
    target: node ? "node" : "web",
    externals: node
      ? fs
          .readdirSync("node_modules")
          .filter(
            // Bundle react-loadable to avoid having to define
            // `serverSideRequirePath` as well as `webpackRequireWeakId`
            // in Loadable HoCs.
            x => !x.includes(".bin") && !x.includes("react-loadable"),
          )
          .reduce((externals, mod) => {
            externals[mod] = `commonjs ${mod}`;
            return externals;
          }, {})
      : {},
    /** node has been depricated in Webpack 5 */
    // node: {
    //   // Prevents the `process.env` defined on the `window` in Html.js
    //   // from being re-defined inside modules by https://github.com/webpack/node-libs-browser
    //   process: false,
    //   fs: "empty",
    // },
    bail: true,
  };
  return config;
};
