const path = require('path')
const baseConfig = require('../../config/base.config')
module.exports = {
  ...baseConfig,
  // 配置是否需要px转rem
  useRem: true
};