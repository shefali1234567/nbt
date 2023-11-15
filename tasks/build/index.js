const path = require("path");
const async = require("async");
const fse = require("fs-extra");
const fs = require("fs");
const webpack = require("webpack");
const sass = require("node-sass");
const config = require("./webpackReleaseConfig");
const critical = require("../../src/containers/html/criticalCss");
const criticalD = require("../../src/containers/html/criticalCssD");
const versionObject = require("./createConfig/version");

const SRC_DIR = config[0].context;
const DIST_DIR = config[0].output.path;
const SITE_NAME = process.env.SITE;
const platform = process.env.PLATFORM ? process.env.PLATFORM : "mobile";

/**
 * Cleans the dist directory ready for a new build.
 */
function clean(done) {
  // fse.remove(DIST_DIR, done);
  deleteVersionedCriticalCss()
    .then(() => {
      csrCritical();
      done();
    })
    .catch(e => {
      console.log(e);
      done();
    });
}

const deleteVersionedCriticalCss = () => {
  const directoryPath = `${SRC_DIR}/public/${SITE_NAME}/css`;

  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      // handling error
      if (err) {
        console.log(`Unable to scan directory: ${err}`);
        return reject(err);
      }
      // listing all files using forEach
      files.forEach(file => {
        // Do whatever you want to do with the file
        if (file.indexOf("csrcritical") > -1) {
          const filepath = `${directoryPath}/${file}`;
          console.log(file, "is now being deleted");
          // fse.remove(filepath);
          fs.unlinkSync(filepath);
        }
      });
      resolve();
    });
  });
};

// deleteVersionedCriticalCss();

/**
 * Creating CSR Critical css
 */
function csrCritical() {
  let content;
  const filename = "csrcritical";
  let version;
  if (process.env.PLATFORM === "mobile") {
    content = critical.csrCritical;
    version = versionObject.criticalCssVersion;
  } else if (process.env.PLATFORM === "desktop") {
    content = criticalD.csrCritical;
    version = versionObject.criticalCssVersionD;
  }

  // Path of the new file with its name
  const filepath = `${SRC_DIR}/public/${SITE_NAME}/css/${filename}.${version}.css`;

  const fileContent = sass.renderSync({
    outFile: filepath,
    data: content,
    outputStyle: "compressed",
  });
  fs.writeFile(filepath, fileContent.css, err => {
    if (err) throw err;
  });
}

/**
 * Copies config files from 'common' to 'common_prod'
 */
function copyConfigFile(srcDir, destDir, msg) {
  msg = msg || "config copy success!";
  fse
    .copy(path.join(srcDir, `${SITE_NAME}.js`), path.join(destDir, `config.js`))
    .then(() => {
      console.log(msg);
    })
    .catch(err => console.error(err));
}

const configSrcPath = process.env.PLATFORM == "desktop" ? "common/desktop" : "common";
copyConfigFile(configSrcPath, "common_prod");
copyConfigFile(`common/footer`, "common_prod/footer");
copyConfigFile(`common/css`, "common_prod/css");
copyConfigFile(`common/elections`, "common_prod/elections");

/**
 * Copies main file from 'src/public' to all inner files
 */
function copyMainCssFile(srcDir, destArr, filename) {
  return destArr.reduce(
    (p, item) => p.then(() => fse.copy(path.join(srcDir, filename), path.join(srcDir, item, filename))),
    Promise.resolve(),
  );
}

copyMainCssFile(
  "src/public",
  ["nbt/css", "dummy/css", "mt/css", "eisamay/css", "mly/css", "tml/css", "tlg/css", "vk/css", "iag/css"],
  "main.css",
)
  .then(() => {
    // all done here
    console.log(".maincss copied Success");
  })
  .catch(err => {
    // error here
    console.log(err);
  });

/**
 * Copies routes files based on platform
 */
function copyRoutesFile(srcDir, destDir, msg) {
  fse
    .copy(`src/router/${platform}/routes.js`, "src/router/master/routes.js")
    .then(() => console.log("routes file copied"))
    .catch(err => console.error(err));

  fse
    .copy(`src/router/${platform}/routesPlus.js`, "src/router/master/routesPlus.js")
    .then(() => console.log("routes file copied"))
    .catch(err => console.error(err));
}

copyRoutesFile();

/**
 * Copies static assets from /src/public/<site> -> /dist. i.e. favicon.ico, robots.txt etc.
 */
function copy(done) {
  setTimeout(() => {
    fse
      .copy(path.join(SRC_DIR, "public", SITE_NAME), DIST_DIR)
      .then(() => fse.copy(path.join(SRC_DIR, "public", "common"), DIST_DIR))
      .catch(err => console.error(err));
  }, 1000);
}

/**
 * Bundles app with Webpack.
 */
function build(done) {
  const compiler = webpack(config);
  compiler.run((err, stats) => {
    if (err) {
      throw err;
    }
    const output = stats.toString({
      colors: true,
      modules: true,
      cached: false,
      cachedAssets: false,
      errorDetails: false,
      chunkOrigins: false,
      exclude: ["node_modules"],
    });
    console.log(output); // eslint-disable-line no-console
    done();
  });
}

async.series(
  [
    clean,
    done => {
      async.parallel([copy, build], done);
    },
  ],
  err => {
    if (err) {
      throw err;
    }
  },
);
