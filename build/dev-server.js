const config = require('../config')
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfigP = require('./webpack.dev.conf');

webpackConfigP.then(webpackConfig => {
  var compiler = webpack(webpackConfig);
  const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    stats: {
      colors: true
    },
    inline: true,
    progress: true,
    disableHostCheck: true
  });

  var server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(config.dev.port, () => {
    console.log(`Starting server on http://${devServerOptions.devServer.host}:${config.dev.port}`);
  });
});
