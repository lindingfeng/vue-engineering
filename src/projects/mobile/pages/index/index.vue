<template>
  <div class="index-page">
    <van-button type="primary" style="width: 100%;" @click="login">成功按钮</van-button>
    <!-- <Swiper /> -->
    <!-- <Amap /> -->
    <!-- <Clipboard /> -->
    <!-- <QRCode /> -->
    <!-- <Sign /> -->
  </div>
</template>

<script>
import {
  Button
} from 'vant';
import apis from '@@/apis/mobileApi'
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
    async login () {
      let ret = await apis.login()
    }
  },
  mounted () {
    this.login()
    // this.$mobileApi.login()
  }
}
</script>

<style lang="postcss" scoped>
/* .index-page {
  height: 100vh;
  padding: 0 20px;
  background-color: #f8f8f8;
} */
</style>
