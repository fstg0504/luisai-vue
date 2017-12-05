'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"//192.168.13.13:8080/ssm/model"',
  API_HOST: '"/api/"'
})
