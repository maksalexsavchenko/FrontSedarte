const { VueLoaderPlugin } = require('vue-loader');

module.exports = function (paths) {
  return {
    module: {
      rules: [
        {
          test: /\.vue$/,
          include: paths.vue,
          loader: 'vue-loader',
          options: {
            loaders: {
              'sass': [
                'vue-style-loader',
                'css-loader',
              ],
              'css': [
                'vue-style-loader',
                'css-loader',
              ]
            },
          },
        },
        {
          test: /\.svg$/,
          include: [paths.vue, paths.icons],
          use: [
            {
              loader: 'babel-loader',
              options: {
                rootMode: "upward",
              }
            },
            {
              loader: 'vue-svg-loader',
              options: {
                svgo: {
                  plugins: [
                    {removeViewBox: false},
                    {removeDimensions: true},
                  ]
                }
              }
            }
          ]
        },
        // this will apply to both plain `.js` files
        // AND `<script>` blocks in `.vue` files
        {
          test: /\.js$/,
          include: paths.vue,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              rootMode: "upward",
            }
          }
        },
        // this will apply to both plain `.css` files
        // AND `<style>` blocks in `.vue` files
        // {
        //   test: /\.s[a|c]ss$/,
        //   include: paths.vue,
        //   loader: 'style-loader!css-loader!sass-loader'
        // },
        {
          test: /\.css$/,
          // include: paths.vue,
          include: [/(node_modules)/, paths.vue],
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        },
        // {
        //   test: /\.(jpe?g|png|gif|ico)$/,
        //   exclude: paths.icons,
        //   loader: 'file-loader',
        //   options: {
        //     name: 'img/[name].[ext]',
        //     // name: '[name].[ext]',
        //     // outputPath: 'img/'
        //   }
        // },
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  }
};
