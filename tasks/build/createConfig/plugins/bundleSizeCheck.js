const WebpackSizeBudgetsPlugin = require("webpack-size-budgets-plugin");
const bytes = require("bytes");

const bundleLimitMapping = {
  desktop: {
    nbt: {
      client: "508.92 KB",
      app: "254.07 KB",
      as: "367.96 KB",
      home: "254.2 KB",
      ps: "242.65 KB",
      vs: "270.33 KB",
      list: "275.33 KB",
      layout: "261.09 KB",
      vendor: "307.33 KB",
    },
    tml: {
      client: "503.37 KB",
      app: "253.6 KB",
      as: "367.42 KB",
      home: "254.2 KB",
      ps: "242.64 KB",
      vs: "269.79 KB",
      list: "275.33 KB",
      layout: "261.08 KB",
      vendor: "307.33 KB",
    },
    tlg: {
      client: "504.74 KB",
      app: "253.6 KB",
      as: "367.42 KB",
      home: "254.2 KB",
      ps: "242.64 KB",
      vs: "269.79 KB",
      list: "275.33 KB",
      layout: "261.08 KB",
      vendor: "307.33 KB",
    },
    mt: {
      client: "505.59 KB",
      app: "253.6 KB",
      as: "367.42 KB",
      home: "254.2 KB",
      ps: "242.64 KB",
      vs: "269.79 KB",
      list: "275.33 KB",
      layout: "261.08 KB",
      vendor: "307.33 KB",
    },
    mly: {
      client: "507.55 KB",
      app: "253.6 KB",
      as: "367.42 KB",
      home: "254.2 KB",
      ps: "242.64 KB",
      vs: "269.79 KB",
      list: "275.33 KB",
      layout: "261.08 KB",
      vendor: "307.33 KB",
    },
    vk: {
      client: "504.77 KB",
      app: "253.6 KB",
      as: "367.42 KB",
      home: "254.2 KB",
      ps: "242.64 KB",
      vs: "269.79 KB",
      list: "275.33 KB",
      layout: "261.08 KB",
      vendor: "307.33 KB",
    },
    iag: {
      client: "493.59 KB",
      app: "253.6 KB",
      as: "367.42 KB",
      home: "254.2 KB",
      ps: "242.64 KB",
      vs: "269.79 KB",
      list: "275.33 KB",
      layout: "261.08 KB",
      vendor: "307.33 KB",
    },
    eisamay: {
      client: "500.9 KB",
      app: "253.6 KB",
      as: "367.42 KB",
      home: "254.2 KB",
      ps: "242.64 KB",
      vs: "269.79 KB",
      list: "275.33 KB",
      layout: "261.08 KB",
      vendor: "307.33 KB",
    },
  },
  mobile: {
    nbt: {
      client: "537.87 KB",
      app: "73.37 KB",
      as: "339.99 KB",
      home: "220.02 KB",
      ps: "244.14 KB",
      vs: "269.94 KB",
      list: "275.37 KB",
      layout: "68.74 KB",
      vendor: "292.89 KB",
    },
    tml: {
      client: "527.73 KB",
      app: "74.89 KB",
      as: "339.07 KB",
      home: "220.02 KB",
      ps: "244.16 KB",
      vs: "264.38 KB",
      list: "275.4 KB",
      layout: "68.74 KB",
      vendor: "292.89 KB",
    },
    tlg: {
      client: "530.57 KB",
      app: "74.89 KB",
      as: "339.07 KB",
      home: "220.02 KB",
      ps: "244.16 KB",
      vs: "264.38 KB",
      list: "275.4 KB",
      layout: "68.74 KB",
      vendor: "292.89 KB",
    },
    mt: {
      client: "530.28 KB",
      app: "72.9 KB",
      as: "339.33 KB",
      home: "220.02 KB",
      ps: "244.14 KB",
      vs: "269.4 KB",
      list: "275.37 KB",
      layout: "68.74 KB",
      vendor: "292.89 KB",
    },
    mly: {
      client: "532.89 KB",
      app: "74.89 KB",
      as: "339.07 KB",
      home: "220.02 KB",
      ps: "244.16 KB",
      vs: "264.38 KB",
      list: "275.4 KB",
      layout: "68.74 KB",
      vendor: "292.89 KB",
    },
    vk: {
      client: "531.91 KB",
      app: "74.36 KB",
      as: "339.07 KB",
      home: "220.02 KB",
      ps: "244.16 KB",
      vs: "264.38 KB",
      list: "275.4 KB",
      layout: "68.74 KB",
      vendor: "292.89 KB",
    },
    iag: {
      client: "520.85 KB",
      app: "74.89 KB",
      as: "339.07 KB",
      home: "220.02 KB",
      ps: "244.16 KB",
      vs: "264.38 KB",
      list: "275.4 KB",
      layout: "68.74 KB",
      vendor: "292.89 KB",
    },
    eisamay: {
      client: "527.56 KB",
      app: "74.91 KB",
      as: "339.07 KB",
      home: "220.02 KB",
      ps: "244.16 KB",
      vs: "264.38 KB",
      list: "275.4 KB",
      layout: "68.74 KB",
      vendor: "292.89 KB",
    },
  },
};

module.exports = (SITE_NAME, name, platform, isStagingEnv) =>
  name === "client" && !isStagingEnv
    ? [
        new WebpackSizeBudgetsPlugin({
          printReport: false,
          severity: "ERROR",
          budgets: {
            "client.*.js": [
              {
                type: "bundle",
                attribute: "size",
                threshold: bundleLimitMapping[platform][SITE_NAME].client,
                severity: "ERROR",
              },
            ],
            "vendor.*.js": [
              {
                type: "bundle",
                attribute: "size",
                threshold: bundleLimitMapping[platform][SITE_NAME].vendor,
                severity: "ERROR",
              },
            ],
            "Home.*.js": [
              {
                type: "bundle",
                attribute: "size",
                threshold: bundleLimitMapping[platform][SITE_NAME].home,
                severity: "ERROR",
              },
            ],
            "AS.*.js": [
              {
                type: "bundle",
                attribute: "size",
                threshold: bundleLimitMapping[platform][SITE_NAME].as,
                severity: "ERROR",
              },
            ],
            "List.*.js": [
              {
                type: "bundle",
                attribute: "size",
                threshold: bundleLimitMapping[platform][SITE_NAME].list,
                severity: "ERROR",
              },
            ],
            "PS.*.js": [
              {
                type: "bundle",
                attribute: "size",
                threshold: bundleLimitMapping[platform][SITE_NAME].ps,
                severity: "ERROR",
              },
            ],
            "Layout.*.js": [
              {
                type: "bundle",
                attribute: "size",
                threshold: bundleLimitMapping[platform][SITE_NAME].layout,
                severity: "ERROR",
              },
            ],
            "VS.*.js": [
              {
                type: "bundle",
                attribute: "size",
                threshold: bundleLimitMapping[platform][SITE_NAME].vs,
                severity: "ERROR",
              },
            ],
          },
        }),
        compiler => {
          compiler.hooks.done.tapAsync("done", (stats, callback) => {
            const assets = {};
            const currentAssets = stats.toJson().assets || [];

            currentAssets.forEach(currentAsset => {
              assets[currentAsset.name] = bytes(currentAsset.size);
            });

            console.log("Bundle Details", assets);
            if (
              stats.compilation.errors.length > 0 &&
              stats.compilation.errors[0].includes("WebpackSizeBudgetsPlugin")
            ) {
              // throw new Error(stats.compilation.errors.map(err => err.message || err));
            }
            callback();
          });
        },
      ]
    : [];
