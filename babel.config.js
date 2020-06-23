module.exports = {
  ignore: ["node_modules/bower_components"],
  presets: [
    ['@babel/preset-env'
      , {
      //   // debug: true,
      // "useBuiltIns": "entry",
      // "useBuiltIns": "usage",
      // "corejs": 3,
      // "targets": {
      //   "ie": "11",
      //   "edge": "17",
      //   "chrome": "70"
      // },
      "targets": "> 0.25%, not dead"
      // include: ["es7.promise.finally", "es7.symbol.async-iterator", "es6.array.sort", "web.dom-collections.for-each"],
    }
    ]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime'
      , {
      "corejs": 2,
    } ],
  ]
};
