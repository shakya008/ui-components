const path = require('path');
const webpack = require('webpack');

/**
 * Webpack Plugins
 *
 * problem with copy-webpack-plugin
 */
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const AOT = process.env.AOT;
const aotLoader = {test: /\.ts$/, loaders: ['@ngtools/webpack'] , exclude : /\.test\.ts$/};
const jitLoaders = {
          test: /\.ts$/,
          loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader'
        ],
          exclude: [path.join(__dirname, "../node_modules")]
        };
const aotPlugin = new AngularCompilerPlugin({
                tsConfigPath: path.join(__dirname,'../tsconfig.aot.json'),
                entryModule: 'src/app/app.module#AppModule'
            });
const tsLoaders = AOT ? [aotLoader] : [jitLoaders];
/**
 * Webpack configuration
 */
module.exports = function (options) {
  return {
    entry: {
      'app': './src/index.ts'
    },

    /**
     * Options affecting the resolving of modules.
     */
    resolve: {
      /**
       * An array of extensions that should be used to resolve modules.
       */
      extensions: ['.ts', '.js', '.json'],
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          enforce: "pre",
          loader: 'tslint-loader',
          exclude: [
            path.join(__dirname, "../node_modules"),
            path.join(__dirname, "../build")
          ]
        },
        {
          test: /\.css$/,
          use: [
            'to-string-loader',
            { loader: 'css-loader' },
            'postcss-loader',
          ],
          exclude: /node_modules/
        },
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: /node_modules/
        },
        ...tsLoaders,

        {
          test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loaders: ['url-loader?limit=10000&minetype=application/font-woff&name=/fonts/[name].[ext]'],
          include: /fonts/,
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loaders: ['url-loader?name=/fonts/[name].[ext]'],
          include: /fonts/,
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          loaders: [
            'file-loader?hash=sha512&digest=hex&name=/media/[name].[ext]',
            'image-webpack?bypassOnDebug=false&optimizationLevel=7&interlaced=false',
          ],
          include: /media/,
        },
        {
          test: /\.json$/,
          loaders: ['json-loader'],
          exclude: /node_modules/
        }
      ],
      noParse: [ /zone\.js\/dist\/.+/, /angular2\/bundles\/.+/ ]
    },

    plugins: [
      new CheckerPlugin(),

      new HtmlWebpackPlugin({
        filename: './index.html',
        template: './src/index.html',
        inject: 'body',
        minify: {
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true
        }
      }),
      new webpack.DefinePlugin({
        // https://webpack.js.org/plugins/define-plugin/#feature-flags
        'process.env.NODE_ENV': JSON.stringify(options.env)
      }),

      new webpack.NoEmitOnErrorsPlugin(),

      new CopyWebpackPlugin([
        { from: 'src/assets', to: '../build/assets' }
      ]),

      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })
    ].concat(AOT ? [aotPlugin] : []),

    node: {
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    }
  };
}
