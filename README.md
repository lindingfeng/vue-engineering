# vue-engineering

> --- 基于Vue工程化实践 ---

## 项目目录

``` bash
├─build  webpack构建目录
├─config  webpack配置目录
├─dist  打包目录
│  └─demo  项目目录
│     ├─static
│     │  └─demo
│     │     ├─js
│     │     ├─css
│     │     ├─fonts
│     │     └─img
│     └─index.html
├─src  开发目录
│  ├─apis  通用接口目录
│  ├─assets  通用静态文件目录
│  ├─components  通用组件目录
│  ├─config  通用配置目录
│  ├─global  全局目录
│  │  ├─css
│  │  └─js
│  ├─projects  项目总目录
│  │  └─demo  项目目录
│  │     ├─apis  项目接口目录
│  │     ├─assets  项目静态文件目录
│  │     ├─components  项目组件目录
│  │     ├─locales  国际化目录
│  │     ├─mock  mock目录
│  │     ├─router  路由目录
│  │     ├─store  Vuex目录
│  │     ├─pages  项目页面目录
│  │     │  └─index  index页面目录
│  │     │     └─index.vue
│  │     ├─template  模板目录
│  │     └─utils  项目工具目录
│  └─utils  通用工具目录
└─static  通用静态文件目录
```

## 使用模板

```
npm install -g @vue/cli-init
vue init lindingfeng/engineering#vue projectName

or

git clone https://github.com/lindingfeng/vue-engineering.git
```

## 开发

``` bash
# 安装项目依赖
yarn install

# 开发环境启动项目
npm run dev demo

# 生产环境构建项目
npm run build demo

# 生产环境构建项目并生成报告
npm run build demo --report
```

## 集成UI框架(已添加按需加载)

### [element-ui](https://element.eleme.cn/#/zh-CN/component/installation) 
```JavaScript
--- main.js ---
// 引入element-ui的样式
import 'element-ui/lib/theme-chalk/index.css'

--- xxx.vue ---  
<template>
  <div class="index-page">
    <!-- 使用Button组件 -->
    <el-button type="success">成功按钮</el-button>
  </div>
</template>
<script>
// 引入element-ui的Button组件
import { Button } from 'element-ui';
export default {
  // 局部注册组件
  components: {
    [Button.name]: Button
  }
}
</script>
```

### [iview](https://www.iviewui.com/) 
```JavaScript
--- main.js ---
// 引入iview的样式
import 'iview/dist/styles/iview.css'

--- xxx.vue ---
<template>
  <div class="index-page">
    <!-- 使用Button组件 -->
    <Button type="primary">主要按钮</Button>
  </div>
</template>
<script>
// 引入iview的Button组件
import { Button } from 'iview'
export default {
  // 局部注册组件
  components: {
    [Button.name]: Button
  }
}
</script>
```

### [mint-ui](https://mint-ui.github.io/#!/zh-cn) 
```JavaScript
--- xxx.vue ---
<template>
  <div class="index-page">
    <!-- 使用Button组件 -->
    <mt-button type="primary">主要按钮</mt-button>
  </div>
</template>
<script>
// 引入mint-ui的Button组件
import { Button } from 'mint-ui'
export default {
  // 局部注册组件
  components: {
    [Button.name]: Button
  }
}
</script>
```

### [vant](https://youzan.github.io/vant/#/zh-CN/intro)  
```JavaScript
--- xxx.vue ---
<template>
  <div class="index-page">
    <!-- 使用Button组件 -->
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>
<script>
// 引入vant的Button组件
import { Button } from 'vant';
export default {
  // 局部注册组件
  components: {
    [Button.name]: Button
  }
}
</script>
```

### [cube-ui](https://didi.github.io/cube-ui/#/zh-CN)  
```JavaScript
--- main.js ---
// 引入cube-ui的样式
import { Style } from 'cube-ui'

--- xxx.vue ---
<template>
  <div class="index-page">
    <!-- 使用Button组件 -->
    <cube-button type="primary">主要按钮</cube-button>
  </div>
</template>
<script>
// 引入cube-ui的Button组件
import { Button } from 'cube-ui';
export default {
  // 局部注册组件
  components: {
    [Button.name]: Button
  }
}
</script>
```

## 常用插件
### vue-awesome-swiper：vue下基于swiper4的轮播组件  
  [Docs(文档)](https://www.swiper.com.cn/api/index.html)  
  Tip：build体积大约为137kb左右，体积较大，对swiper要求不高的话不推荐使用哦!

### vue-amap：vue下高德地图组件  
  [Docs(文档)](https://elemefe.github.io/vue-amap/#/zh-cn/base/amap)  
  Tip：build体积大约为58kb左右，需在https协议下使用哦!
