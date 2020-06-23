'use strict'; // eslint-disable-line

const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanPlugin = require('clean-webpack-plugin');
// const glob = require('glob');

const path = require('path');
const DotEnv = require('webpack-dotenv-plugin');
const ReplaceInFile = require('./webpack/replace-in-file');
const BrowserSync = require('./webpack/browser-sync');
// const opn = require('opn');

const Styles = require('./webpack/styles');
const Scripts = require('./webpack/scripts');
const CopyAssets = require('./webpack/copy-assets');
const VueLoader = require('./webpack/vue-loader');
const FtpUpload = require('./webpack/ftp-upload');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const gitRoot = require('git-root');

// PATHS______________________________________________________________________________________________________________
const relPath = path.relative(gitRoot(), __dirname);
const assets =  path.join(__dirname, './assets');
const PATHS = {
  // resources: path.join(__dirname, './resources'),
  // partials: path.join(__dirname, './resources/views'),
  assets: assets,
  dist: path.join(__dirname, './dist'),
  fonts: path.join(assets, '/fonts'),
  icons: path.join(assets, '/icons'),
  vue: path.join(assets, '/vue'),
  relDist: path.join(relPath, './dist'),
  sep: path.sep,
  relPath
};

if (process.env.NODE_ENV === undefined) {
  // process.env.NODE_ENV = isProduction ? 'production' : 'development';
  process.env.NODE_ENV = 'development';
}

const common = merge([
  {
    entry: {
      "main": [
        PATHS.assets + '/scripts/main.js',
        PATHS.assets + '/styles/main.scss',
      ],
      // "admin": [
      //   PATHS.assets + '/scripts/admin.js',
      //   PATHS.assets + '/styles/admin.scss',
      // ],
      // 'components': glob.sync(PATHS.partials + '/**/*.js'),
      //'vue': PATHS.assets + '/vue/main.js',
    },
    output: {
      path: PATHS.dist,
      filename: 'scripts/[name].js',
      publicPath: `/${PATHS.relDist}/`,
    },
    // cache: true,
    stats: {children: false},
    resolve: {
      extensions: ['.js', '.css', '.scss', '.vue', '.json'],
      modules: [
        PATHS.assets,
        // PATHS.partials,
        'node_modules',
      ],
      enforceExtension: false,
      alias: {
        'scss': PATHS.assets + '/styles/common',
        'classes': PATHS.assets + '/scripts/classes',
        'img': PATHS.assets + '/img',
        'fonts': PATHS.assets + '/fonts',
      },
    },
    externals: {
      jquery: 'jQuery',
    },
    name: 'styles',
    watchOptions: {
      aggregateTimeout: 500, // The default
      ignored: PATHS.dist,
    },

    // PLUGINS________________________________________________________________________________________________________
    plugins: [
      new DotEnv({
        sample: '',
        path: './.env'
      }),
      new CleanPlugin([PATHS.dist], {verbose: false}),
      new webpack.LoaderOptionsPlugin({
        test: /\.js$/,
        options: {
          eslint: {
            failOnWarning: false,
            failOnError: true
          },
        },
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
    ],
  },

  // PLUGINS__________________________________________________________________________________________________________
  CopyAssets(PATHS),

  Scripts(PATHS),
  Styles(PATHS),
  // ReplaceInFile(PATHS.resources),

  //VueLoader(PATHS),

  // opn('http://wp.docker.localhost:8000'),
]);

// DEVELOPMENT / PRODUCTION __________________________________________________________________________________________
module.exports = function (env) {

  let newRel = relPath;
  if ( process.env.EXCLUDE_WPAPP ) {
    newRel = newRel.replace(`wp-app`, '');
    // newRel = newRel.replace('\\', '/');
    // newRel = newRel.replace(/\\/g, '/');
  }

  switch (env.NODE_ENV) {
    case 'production':
      return merge([
        common,
        {
          output: {
            publicPath:  path.join(newRel, './dist/'),
          },
          optimization: {
            concatenateModules: true,
            noEmitOnErrors: true,
            minimize: true,
            minimizer: [
              new UglifyJsPlugin({
                extractComments: true,
                uglifyOptions: {
                  compress: {
                    drop_console: true,
                  },
                }
              })
            ]
          },
        },
        // UglifyParallel(true),
      ]);

    case 'stage':
      return merge([
        common,
        {
          output: {
            publicPath:  path.join(newRel, './dist/'),
          },
          devtool: 'source-map',
          stats: {
            warnings: false,
            moduleTrace: false,
          },
        },
       // BrowserSync(PATHS.resources, env),
        FtpUpload(PATHS, '/styles/'),
        FtpUpload(PATHS, '/scripts/'),
        // FtpUpload(PATHS.dist + '/styles/admin.css'),
        // FtpUpload(PATHS.dist + '/scripts/admin.js'),
        // opn('http://wp.docker.localhost:8000'),
      ]);

    case 'development':
      return merge([
        common,
        {
          devtool: 'source-map',
          output: {
            publicPath:  path.join(newRel, './dist/').replace(/\\/g, '/'),
          },
        },
       // BrowserSync(PATHS.resources),
      ]);
  }
};
