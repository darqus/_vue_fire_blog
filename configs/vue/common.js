const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')


const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

const environment = dotenv.config()
dotenvExpand(environment)

module.exports.isProd = isProd
module.exports.isDev = isDev
module.exports.environment = environment.parsed
