const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function (paths) {
  return {
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : '',
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|s?[ca]ss)$/,
          // test: /\.(js)$/,
          include: paths.assets,
          // exclude: paths.dist,
          // loader: 'import-glob',
          loader: 'webpack-import-glob',
        },
        {
          test: /\.scss$/,
          include: paths.assets,
          // exclude: paths.dist,
          // use: ExtractTextPlugin.extract({
          //   publicPath: '../',
          //   fallback: 'style-loader',
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // only enable hot in development
                hmr: process.env.NODE_ENV === 'development',
                // if hmr does not work, this is a forceful method.
                reloadAll: true,
              },
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'resolve-url-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                // importer: globImporter()
              }
            },
            // 'css-loader?sourceMap',
            // 'postcss-loader?sourceMap',
            // 'resolve-url-loader',
            // {
            //   loader: 'resolve-url-loader',
            //   // options: {
            //   //   engine: 'rework',
            //   //   sourceMap: true,
            //   //   debug: true,
            //   // }
            // },
            // 'sass-loader?sourceMap',
          ],
          // }),
        },
        // {
        //   test: /\.css$/,
        //   include: paths.assets,
        //   exclude: paths.dist,
        //   // use: ExtractTextPlugin.extract({
        //   //   fallback: 'style-loader',
        //   //   use: 'css-loader',
        //   // }),
        //   use: [
        //     MiniCssExtractPlugin.loader,
        //     {
        //       loader: 'css-loader',
        //       options: {
        //         sourceMap: true
        //       }
        //     },
        //   ]
        // },
      ],
    },
    plugins: [
      // new StyleLintPlugin({
      //   configFile: './.stylelintrc',
      //   files: '*.scss',
      //   context: 'src',
      // }),
      // new ExtractTextPlugin('./styles/[name].css'),
      new MiniCssExtractPlugin({
        filename: './styles/[name].css'
      })
    ],
  };
};
