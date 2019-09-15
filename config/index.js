'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const minimist = require('minimist')
const path = require('path')
const chalk = require('chalk')

const getParamFromCLI = function(cliName) {
  const args = minimist(process.argv.slice(2));
  if (cliName) {
    return args[cliName];
  } else {
    return args;
  }
}

let projectName = getParamFromCLI('projectname') || getParamFromCLI()._[0];

if (!projectName) {
  console.log(chalk.red('请输入需要运行的项目名. eg: npm run dev 项目名'));
  process.exit(0);
}

process.env.projectName = projectName

// const entry = 'main.js';
const projectConfig = require(`../src/projects/${projectName}/project.config.js`);
const publicPath = `/${projectName}/`;
const template = projectConfig.useRem
  ? path.resolve(__dirname, `../src/projects/${projectName}/template/index.mobile.html`)
  : path.resolve(__dirname, `../src/projects/${projectName}/template/index.pc.html`);
module.exports = {
  projectConfig,
  dev: {
    projectName,
    template,
    entry: `./src/projects/${projectName}/main.js`,
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: `/dist/${projectName}/`,
    proxyTable: {},
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: `${getParamFromCLI()._[1] || 8090}`, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    useEslint: false,
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, `../dist/${projectName}/index.html`),
    template,

    // Paths
    assetsRoot: path.resolve(__dirname, `../dist/${projectName}`),
    assetsSubDirectory: 'static',
    assetsPublicPath: publicPath,

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
