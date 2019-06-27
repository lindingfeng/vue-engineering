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
│     │     └─css
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
│  │      ├─apis  项目接口目录
│  │      ├─assets  项目静态文件目录
│  │      ├─components  项目组件目录
│  │      ├─config  项目配置目录
│  │      ├─router  路由目录
│  │      ├─store  Vuex目录
│  │      ├─pages(views)  项目页面目录
│  │      │  └─index  index页面目录
│  │      │     └─index.vue
│  │      ├─template  模板目录
│  │      └─utils  项目工具目录
│  └─utils  通用工具目录
└─static  通用静态文件目录
```

## Build Setup

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
