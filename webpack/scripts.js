module.exports = function (paths) {
  return {
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: "eslint-loader",
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              rootMode: "upward",
            }
          }
        },
      ],
    },
  };
};
