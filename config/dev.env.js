'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_URL: '"http://192.168.100.33:32010"'
  BASE_URL: '"http://localhost:6014"'
})
