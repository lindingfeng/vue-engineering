// https://github.com/michael-ciniawsky/postcss-load-config
const config = require('./config');

const plugins = {
  "postcss-import": {},
  "postcss-url": {},
  // 改插件用于解析vue style下的postcss语法
  "precss": {},
  "postcss-cssnext": {}
}

// 判断是否开启px转rem
const useRem = config.projectConfig.useRem;
const px2Rem = config.projectConfig.px2Rem;
if (useRem) {
  plugins['postcss-px2rem'] = {
    remUnit: Number(px2Rem)
  }
};

module.exports = {
  plugins
}
