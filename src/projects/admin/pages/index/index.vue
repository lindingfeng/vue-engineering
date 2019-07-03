<template>
  <div class="index-page">
      <el-button type="success">成功按钮</el-button>
      <!-- <echart /> -->
      <!-- <mavonEditor /> -->
  </div>
</template>

<script>
import { Button } from 'element-ui'
// import echart from '@@/components/echart'
// import mavonEditor from '@@/components/mavonEditor'

export default {
  components: {
    [Button.name]: Button,
    // echart,
    // mavonEditor
  },
  data () {
    return {
    }
  },
  mounted () {
    // this.$adminApi.getOrderList().then((ret) => {
    //   console.log(ret)
    // })
  }
}
</script>

<style lang="postcss" scoped>
.content {
  .font {
    font-size: 16px;
  }
}
</style>
