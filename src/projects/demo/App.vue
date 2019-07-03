<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<!--
  内置4种css解析器，默认使用postcss。
  lang="postcss"、lang="scss"
  lang="less"、lang="stylus"
-->
<style lang="postcss">
@import '../../global/css/base.css';
.hidden {
  overflow: hidden !important;
}
</style>
