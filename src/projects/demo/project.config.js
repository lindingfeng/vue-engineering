const path = require('path')
const baseConfig = require(path.resolve(__dirname, '../../config/index.js'))
module.exports = {
  ...baseConfig,
  // 配置是否需要px转rem
  useRem: true
};