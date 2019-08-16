<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted () {
    
  }
}
</script>

<!--
  内置4种css解析器，默认使用postcss。
  lang="postcss"、lang="scss"
  lang="less"、lang="stylus"
-->
<style lang="postcss">
@import '../../global/css/base.css';
html {
  width: 100%;
  height: 100%;
  background: #f1f1f1;
}
body {
  overflow-x: hidden;
}
.hidden {
  overflow: hidden !important;
}
.el-table th.gutter {
  display: table-cell !important;
}
.el-message {
  min-width: 0 !important;
}
</style>
