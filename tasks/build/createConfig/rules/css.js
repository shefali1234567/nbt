const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const configfile = require(`./../../../../common/css/${process.env.SITE}`);
const getLoaders = (modules, { node, sourceMap, optimize }) => {
  const cssLoaderOptions = {
    // modules,
    sourceMap: !!sourceMap,
    minimize: optimize,
    data: configfile.css,
    localIdentName: optimize ? "[hash:base64]" : "[name]_[local]_[hash:base64:5]",
  };

  if (node) {
    return [
      {
        loader: "css-loader/locals",
        options: cssLoaderOptions,
      },
    ];
  }

  return [
    "style-loader",
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        esModule: false,
      },
    },
    {
      loader: "css-loader",
      options: cssLoaderOptions,
    },
    {
      loader: "sass-loader",
      options: cssLoaderOptions,
    },
    {
      loader: "postcss-loader",
      options: {
        ident: "postcss",
        plugins: () => [autoprefixer()],
      },
    },
  ];
};

const css = (include, options) => {
  const loaders = getLoaders(false, options);
  return {
    test: /\.s?css$/,
    include,
    use: loaders,
  };
};

const cssModules = (include, options) => {
  const loaders = getLoaders(true, options);
  return {
    test: /\.s?css$/,
    include,
    use: loaders,
  };
};

module.exports = {
  css,
  cssModules,
};
