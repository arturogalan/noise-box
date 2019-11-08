'use strict';
const path = require('path');
const config = require('../config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const packageConfig = require('../package.json');

exports.assetsPath = function(_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path);
};

exports.widgetPath = function(_path) {
  return path.posix.join(config.build.widgetDirectory, _path);
};

exports.customAssets = ['langs', 'config', 'schemas', 'mocks'].map(function(asset) {
  return {
    from: path.resolve(__dirname, '../src/' + asset),
    to: path.resolve(config.build.assetsRoot, asset),
  };
});

exports.styleLoaders = function({extract, sourceMap}) {
  const includePath = path.join(__dirname, '..', 'src');
  return [
    {
      test: /\.(sa|sc)ss$/,
      include: includePath,
      use: [
        extract ? MiniCssExtractPlugin.loader : 'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
            sourceMap,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap,
            prependData: `@import "@/scss/_variables.scss";`
          },
        },
      ],
    },
    {
      test: /\.css$/,
      include: includePath,
      use: [
        extract ? MiniCssExtractPlugin.loader : 'vue-style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap,
          },
        },
      ],
    },
  ];
};

exports.createNotifierCallback = ()=> {
  const notifier = require('node-notifier');

  return (severity, errors)=> {
    if (severity !== 'error') {
      return;
    }

    const error = errors[0];
    const filename = error.file && error.file.split('!').pop();

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.svg'),
    });
  };
};
