<template>
  <div class="index-page">
    <van-button type="primary">主要按钮</van-button>
    <!-- <Swiper /> -->
    <!-- <Amap /> -->
    <!-- <Clipboard /> -->
    <!-- <QRCode /> -->
    <!-- <Sign /> -->
  </div>
</template>

<script>
import { Button } from 'vant';
// import Swiper from '@@/components/Swiper'
// import Amap from '@@/components/Amap'
// import Clipboard from '@@/components/Clipboard'
// import QRCode from '@@/components/QRCode'
// import Sign from '@@/components/sign'

export default {
  components: {
    [Button.name]: Button,
    // Swiper,
    // Amap,
    // Clipboard,
    // QRCode,
    // Sign
  },
  data () {
    return {
    }
  },
  methods: {
    showSome () {
    }
  },
  mounted () {
    // this.$demoApi.getOrderList().then((ret) => {
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
