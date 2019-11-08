const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
    }),
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {from: /./, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')},
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? {warnings: false, errors: true}
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    headers: {
      'X-XSS-Protection': '0',
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EvalSourceMapDevToolPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunks: ['app'],
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*'],
      },
    ]),
  ],
});

module.exports = new Promise((resolve, reject)=> {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port)=> {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`
              _  _     ___     ___     ___     ___             ___     ___   __  __  
             | \\| |   / _ \\   |_ _|   / __|   | __|    ___    | _ )   / _ \\  \\ \\/ /  
             | .| |  | (_) |   | |    \\__ \\   | _|    |___|   | _ \\  | (_) |  >  <   
             |_|\\_|   \\___/   |___|   |___/   |___|           |___/   \\___/  /_/\\_\\

             
                    is running on http://${devWebpackConfig.devServer.host}:${port}`],
          notes: [],
        },
        onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined,
      }));

      resolve(devWebpackConfig);
    }
  });
});
