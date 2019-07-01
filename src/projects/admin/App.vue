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
  默认使用postcss，如需使用sass或less，安装对应的loader即可。
  sass：yarn add sass-loader node-sass -D
  less：yarn add less-loader -D
-->
<style lang="postcss">
@import '../../global/css/base.css';
.hidden {
  overflow: hidden !important;
}
</style>
