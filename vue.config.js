const { version } = require('./package.json')

process.env.VUE_APP_VERSION = version

module.exports = {
  devServer: {
    hot: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  /* css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/_variables.scss";
        `,
      },
    },
  }, */
}
