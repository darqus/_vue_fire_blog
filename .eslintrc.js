const { overrides } = require('./configs/eslintrc/index')


module.exports = {
  root: true,
  env: {
    // browser: true,
    node: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    project: [
      'jsconfig.json',
    ],
    sourceType: 'module',
    extraFileExtensions: [
      '.vue',
    ],
  },
  extends: [
    'eslint:recommended',
    'plugin:promise/recommended',
    '@vue/airbnb',
    './configs/eslintrc/index',
  ],
  plugins: [
    'class-property',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1,

    'no-multiple-empty-lines': ['error', {
      max: 2,
    }],
    camelcase: 'off',
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'always-multiline'],
    'class-property/class-property-semicolon': ['error', 'always'],
    'require-await': 'error',
    'no-void': 0,
    'max-len': ['error', {
      code: 120,
      ignoreComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state',
        'acc',
        'e',
      ],
    }],
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    }],
    'promise/no-return-wrap': ['error', {
      allowReject: true,
    }],
  },
  overrides,
}
