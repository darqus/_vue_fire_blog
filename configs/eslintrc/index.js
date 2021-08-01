const typescript = require('./eslint-config-app-typescript')


module.exports = {
  extends: [
    './eslint-config-app-vue',
    './eslint-config-app-typescript',
    './eslint-config-app-import',
  ],
}

module.exports.overrides = [
  ...typescript.overrides,
]
