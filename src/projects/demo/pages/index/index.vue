<template>
  <div class="index-page">
    <van-button type="primary">主要按钮</van-button>
    <!-- <van-button type="primary" @click="$i18n.locale = 'zh'">切换中文</van-button>
    <van-button type="primary" @click="$i18n.locale = 'en'">切换英文</van-button>
    <p>{{$t('message.hello')}}</p> -->
    <!-- <Swiper /> -->
    <!-- <Amap /> -->
    <!-- <Clipboard /> -->
    <!-- <QRCode /> -->
    <!-- <Sign /> -->
  </div>
</template>

<script>
import Vue from 'vue'
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
