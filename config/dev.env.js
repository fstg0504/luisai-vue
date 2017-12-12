'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"//192.168.13.39:8010/ssm/model"',
  BASE_API: '"//192.168.13.186:8080/ssm/model"',// 线上186
  API_HOST: '"/api/"'
})
