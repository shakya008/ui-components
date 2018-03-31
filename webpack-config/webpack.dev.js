/**
 * Used to merge webpack configs
*/
const webpackMerge = require('webpack-merge');
/**
 * The settings that are common to prod and dev
*/
const commonConfig = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = function (config) {
  return webpackMerge(commonConfig(config), {

    devtool: 'inline-source-map',

    output: {
      path: path.join(__dirname, '../build'),
      filename: '[name].dev.js',
      sourceMapFilename: '[name].js.map',
      publicPath: '/',
      chunkFilename: '[name].dev.js'
    },

    plugins: [
      new StyleLintPlugin({
        configFile: './.stylelintrc',
        files: 'app/**/*.css',
        failOnError: false
      }),
    ]
  });
}
