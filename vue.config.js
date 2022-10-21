const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
  // 强制css内联，不然会导致样式失效问题
  css: {
    extract: false
  },
  parallel: false,

  configureWebpack: {
    plugins: [new VueLoaderPlugin()],
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: {
            loader: "vue-loader"
          }
        }
      ]
    }
  }
};
